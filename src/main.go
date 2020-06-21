package main

import (
	"github.com/astaxie/beego/logs"
	"golang.org/x/net/websocket"
	"net/http"
	"strconv"
	// "time"
	"encoding/json"
)

type Message struct {
	ClientID          int    `json:"clientID"`
	OpponentID        int    `json:"opponentID"`
	RoomID            int    `json:"roomID"`
	Key               string `json:"key"`
	X                 int    `json:"x"`
	Y                 int    `json:"y"`
	Msg               string `json:"msg"`
	Player            bool   `json:"player"`
	CanStart          bool   `json:"canStart"`
	OpponentQuit      bool   `json:"opponentQuit"`
	Talk              string `json:"talk"`
	CanOpponentRegret int   `json:"canOpponentRegret"`
}

var userIndex int = 0
var roomMap = make(map[int][]int)
var message = make(chan Message, 50)        // 消息通道
var clients = make(map[int]*websocket.Conn) // 用户组映射

func main() {
	logs.EnableFuncCallDepth(true)
	logs.SetLogFuncCallDepth(3)
	logs.Info("http服务器启动，端口：8085")

	http.Handle("/getData", websocket.Handler(Echo))
	if err := http.ListenAndServe(":8085", nil); err != nil {
		logs.Error(err)
	}

}

func Echo(w *websocket.Conn) {
	var err error
	var user = &Message{}
	for {
		var reply string
		if err = websocket.Message.Receive(w, &reply); err != nil {
			logs.Info("不能够接受消息 err==", err)
			break
		}

		logs.Info("服务端收到消息：", reply)

		if reply == `` {
			user.ClientID = userIndex
			user.Msg = `你的id为` + strconv.Itoa(userIndex)
			userIndex++
			var res []byte
			logs.Info(`%+v`, user)
			if res, err = json.Marshal(user); err != nil {
				logs.Error("json.Marshal 失败", err)
				return
			}
			logs.Info(`res`, string(res))
			err = websocket.Message.Send(w, string(res))
		} else {

			if err = json.Unmarshal([]byte(reply), user); err != nil {
				logs.Error("json.Unmarshal 失败", err)
				return
			}

			if user.CanStart == false {
				if len(roomMap[user.RoomID]) >= 2 {
					user.Msg = "该房间号已满！"
				} else {
					if len(roomMap[user.RoomID]) == 1 && roomMap[user.RoomID][0] != user.ClientID {
						user.Msg = "已匹配到对手，游戏开始！"
						user.Player = false
						user.CanStart = true
						user.OpponentID = roomMap[user.RoomID][0]
						Opponent := *user
						Opponent.ClientID = user.OpponentID
						Opponent.OpponentID = user.ClientID
						Opponent.Player = true
						message <- Opponent
					} else if len(roomMap[user.RoomID]) == 0 {
						user.Msg = "正在等待对手匹配..."
						user.Player = true
					}
					roomMap[user.RoomID] = append(roomMap[user.RoomID], user.ClientID)
				}

				var res []byte
				if res, err = json.Marshal(user); err != nil {
					logs.Error("json.Marshal 失败", err)
					return
				}

				err = websocket.Message.Send(w, string(res))
			} else if user.Key != `` {
				Opponent := *user
				Opponent.ClientID = user.OpponentID
				Opponent.OpponentID = user.ClientID
				Opponent.Msg = `对手走子`
				Opponent.Player = !user.Player
				message <- Opponent
			} else if user.Talk != `` {
				Opponent := *user
				Opponent.ClientID = user.OpponentID
				Opponent.OpponentID = user.ClientID
				Opponent.Msg = `对手发来一条消息...`
				Opponent.Player = !user.Player
				message <- Opponent
			} else if user.CanOpponentRegret != 0 {
				Opponent := *user
				Opponent.ClientID = user.OpponentID
				Opponent.OpponentID = user.ClientID
				if user.CanOpponentRegret == 1{
					Opponent.Msg = `对手请求悔棋`
				}else if user.CanOpponentRegret == 2{
					Opponent.Msg = `对手同意悔棋`
				}else{
					Opponent.Msg = `对手不同意悔棋`
				}
				Opponent.Player = !user.Player
				message <- Opponent
			}

		}

		clients[user.ClientID] = w

		if err != nil {
			logs.Error("发送消息失败", err)
			return
		}
	}

	defer func() {
		Opponent := *user
		logs.Info(`%+v============`, Opponent)
		Opponent.OpponentID = user.ClientID
		Opponent.Msg = `你的对手已退出游戏!`
		Opponent.OpponentQuit = true

		if roomMap[Opponent.RoomID][0] == user.ClientID {
			Opponent.ClientID = roomMap[Opponent.RoomID][1]
			roomMap[Opponent.RoomID] = roomMap[Opponent.RoomID][0:]
		} else if roomMap[Opponent.RoomID][1] == user.ClientID {
			Opponent.ClientID = roomMap[Opponent.RoomID][0]
			roomMap[Opponent.RoomID] = roomMap[Opponent.RoomID][:1]
		}
		delete(roomMap, user.RoomID)
		message <- Opponent
		w.Close()
		logs.Warn(`websocket服务退出`)
	}()

}

func broadcaster() {
	for {
		// 哪个case可以执行，则转入到该case。若都不可执行，则堵塞。
		select {
		// 消息通道中有消息则执行，否则堵塞
		case msg := <-message:
			logs.Info("================广播消息============%+v", msg)
			var res []byte
			var err error
			if res, err = json.Marshal(msg); err != nil {
				logs.Error("json.Marshal 失败", err)
				return
			}
			logs.Info(`===============`, string(res))
			err = websocket.Message.Send(clients[msg.ClientID], string(res))
			if err != nil {
				logs.Error(`!!!!!!!`, err)
			}
		}
	}
}

func init() {
	go broadcaster()
}
