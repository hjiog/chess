package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/cos-go-sdk-v5/debug"
	"github.com/tencentyun/scf-go-lib/cloudevents/scf"
	"github.com/tencentyun/scf-go-lib/cloudfunction"
)

type websocketEvent struct {
	Websocket scf.APIGatewayWebSocketAction `json:"websocket"`
}

type message struct {
	ClientID          int    `json:"clientID"`
	OpponentID        int    `json:"opponentID"`
	RoomID            int    `json:"roomID"`
	Key               string `json:"key"`
	X                 int    `json:"x"`
	Y                 int    `json:"y"`
	Msg               string `json:"msg"`
	Player            bool   `json:"player"` // true为先手，false为后手
	CanStart          bool   `json:"canStart"`
	OpponentQuit      bool   `json:"opponentQuit"`
	Talk              string `json:"talk"`
	CanOpponentRegret int    `json:"canOpponentRegret"`
}

func main() {
	cloudfunction.Start(deleteID)
}

func deleteID(ctx context.Context, event scf.APIGatewayWebSocketConnectionRequest) (string, error) {
	fmt.Printf("ctx:%v\n", ctx)
	fmt.Printf("event:%v\n", event)

	var (
		bucket            string
		region            string
		mySecretID        string
		mySecretKey       string
		internalDomainURL string
	)
	bucket = os.Getenv("bucket")
	region = os.Getenv("region")
	mySecretID = os.Getenv("secret_id")
	mySecretKey = os.Getenv("secret_key")
	internalDomainURL = os.Getenv("url")

	myBucketURL := "https://" + bucket + ".cos." + region + ".myqcloud.com"

	fmt.Println("myBucketURL=============>:", myBucketURL)
	fmt.Println("mySecretID=============>:", mySecretID)
	fmt.Println("mySecretKey=============>:", mySecretKey)
	fmt.Println("internalDomainURL=============>:", internalDomainURL)

	u, _ := url.Parse(myBucketURL)
	b := &cos.BaseURL{BucketURL: u}
	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  mySecretID,
			SecretKey: mySecretKey,
			Transport: &debug.DebugRequestTransport{
				RequestHeader:  true,
				RequestBody:    true,
				ResponseHeader: true,
				ResponseBody:   true,
			},
		},
	})

	connectionID := event.WebSocketConn.SecConnectionID

	// 获取存储对象
	resp, err := c.Object.Get(context.Background(), connectionID, nil)
	if err != nil {
		fmt.Println("Object.Get err=======>:", err)
	}

	// 得到对手的connectionID
	opponentID, _ := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	fmt.Printf("opponentID: %s\n", string(opponentID))

	// 删除存储对象
	_, err = c.Object.Delete(context.Background(), connectionID)
	if err != nil {
		panic(err)
	}

	cleanMsg := websocketEvent{}
	cleanMsg.Websocket.Action = "closing"
	cleanMsg.Websocket.DataType = "text"
	cleanMsg.Websocket.SecConnectionID = connectionID

	// 向当前客户端回推消息
	send(internalDomainURL, cleanMsg)

	// 向对手回推消息
	cleanMsg.Websocket.SecConnectionID = string(opponentID)
	cleanMsg.Websocket.Action = "data send"
	var msg = message{}
	msg.Msg = "你的对手已退出游戏！"
	websocketData, err := json.Marshal(msg)
	if err != nil {
		fmt.Println("json.Marshal err=======>:", err)
	}
	fmt.Println("send msg========>:", string(websocketData))
	cleanMsg.Websocket.Data = string(websocketData)
	send(internalDomainURL, cleanMsg)

	return "delete connection successful", nil
}

func send(url string, msg websocketEvent) {
	websocketMsg, err := json.Marshal(msg)
	if err != nil {
		fmt.Println("json.Marshal err=======>:", err)
	}
	fmt.Println("send msg========>:", string(websocketMsg))

	resp, err := http.Post(url, "application/json", strings.NewReader(string(websocketMsg)))
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(body))
}
