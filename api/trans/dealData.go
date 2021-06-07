package main

import (
	"encoding/json"
	"strconv"

	"github.com/astaxie/beego/logs"
)

type message struct {
	ClientID          int    `json:"clientID"`
	OpponentID        int    `json:"opponentID"`
	RoomID            int    `json:"roomID"`
	PreTop            int    `json:"preTop"`
	PreLeft           int    `json:"preLeft"`
	CurrentTop        int    `json:"currentTop"`
	CurrentLeft       int    `json:"currentLeft"`
	Msg               string `json:"msg"`
	IsPlayFirst       bool   `json:"isPlayFirst"` // true为先手，false为后手
	CanStart          bool   `json:"canStart"`
	OpponentQuit      bool   `json:"opponentQuit"`
	Talk              string `json:"talk"`
	CanOpponentRegret int    `json:"canOpponentRegret"`
	CanRestart        int    `json:"canRestart"`
}

var userIndex int = 0
var roomMap = make(map[int][]int)
var clients = make(map[int]string) // 用户组映射

func dealData(receiveData string, SecConnectionID string, callBack func(string)) (user *message, opponentMsg message, err error) {

	if SecConnectionID == "" {
		logs.Error("SecConnectionID is null")
		return
	}

	user = &message{}
	logs.Info("服务端收到消息：", receiveData)

	if receiveData == "" {
		user.ClientID = userIndex
		user.Msg = `你的id为` + strconv.Itoa(userIndex)
		userIndex++
		logs.Info(`%+v`, user)
		return
	}

	if err = json.Unmarshal([]byte(receiveData), user); err != nil {
		logs.Error("json.Unmarshal 失败", err)
		return
	}

	clients[user.ClientID] = SecConnectionID

	logs.Info("get userMsg:", user)

	if user.CanStart == false {
		if len(roomMap[user.RoomID]) >= 2 {
			user.Msg = "该房间号已满！"
			return
		}

		roomMap[user.RoomID] = append(roomMap[user.RoomID], user.ClientID)

		if len(roomMap[user.RoomID]) == 2 && roomMap[user.RoomID][0] != user.ClientID {
			user.Msg = "已匹配到对手，游戏开始！"
			user.IsPlayFirst = false
			user.CanStart = true
			user.OpponentID = roomMap[user.RoomID][0]
			opponentMsg = *user
			opponentMsg.ClientID = user.OpponentID
			opponentMsg.OpponentID = user.ClientID
			opponentMsg.IsPlayFirst = true
			callBack(clients[opponentMsg.ClientID])
			return
		}

		if len(roomMap[user.RoomID]) == 1 {
			user.Msg = "正在等待对手匹配..."
			user.IsPlayFirst = true
			return
		}
	}

	if user.CurrentTop != -1 {
		opponentMsg = *user
		opponentMsg.ClientID = user.OpponentID
		opponentMsg.OpponentID = user.ClientID
		opponentMsg.IsPlayFirst = !user.IsPlayFirst
		opponentMsg.Msg = `对手走子`
		return
	}

	if user.Talk != `` {
		opponentMsg = *user
		opponentMsg.ClientID = user.OpponentID
		opponentMsg.OpponentID = user.ClientID
		opponentMsg.IsPlayFirst = !user.IsPlayFirst
		opponentMsg.Msg = `对手发来一条消息...`
		return
	}

	if user.CanOpponentRegret != 0 {
		opponentMsg = *user
		opponentMsg.ClientID = user.OpponentID
		opponentMsg.OpponentID = user.ClientID
		opponentMsg.IsPlayFirst = !user.IsPlayFirst
		if user.CanOpponentRegret == 1 {
			opponentMsg.Msg = `对手请求悔棋`
		} else if user.CanOpponentRegret == 2 {
			opponentMsg.Msg = `对手同意悔棋`
		} else {
			opponentMsg.Msg = `对手不同意悔棋`
		}
		return
	}

	if user.CanRestart != 0 {
		opponentMsg = *user
		opponentMsg.ClientID = user.OpponentID
		opponentMsg.OpponentID = user.ClientID
		opponentMsg.IsPlayFirst = !user.IsPlayFirst
		if user.CanRestart == 1 {
			opponentMsg.Msg = `对手请求重开`
		} else if user.CanRestart == 2 {
			opponentMsg.Msg = `对手同意重开`
		} else {
			opponentMsg.Msg = `对手不同意重开`
		}
		return
	}

	return
}
