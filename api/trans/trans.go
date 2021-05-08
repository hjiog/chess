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

func main() {
	cloudfunction.Start(transData)
}

func transData(ctx context.Context, event websocketEvent) (string, error) {
	fmt.Printf("ctx:%v\n", ctx)
	fmt.Printf("event:%v\n", event)
	fmt.Printf("data:%v\n", event.Websocket.Data)

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

	// 建立存储桶连接
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

	connectionID := event.Websocket.SecConnectionID

	tranMsg := websocketEvent{}
	tranMsg.Websocket.Action = "data send"
	tranMsg.Websocket.DataType = "text"

	// 处理相关数据
	userMsg, opponentMsg, err := dealData(event.Websocket.Data, connectionID, func(SecConnectionID string) {
		// 回调函数里更新存储对象
		// 通过字符串上传对象
		f := strings.NewReader(SecConnectionID)
		_, err := c.Object.Put(context.Background(), connectionID, f, nil)
		if err != nil {
			fmt.Println("Object.Put err=======>:", err)
		}
		f = strings.NewReader(connectionID)
		_, err = c.Object.Put(context.Background(), SecConnectionID, f, nil)
		if err != nil {
			fmt.Println("Object.Put err=======>:", err)
		}
	})

	fmt.Println("userMsg =======>:", userMsg)
	fmt.Println("opponentMsg =======>:", opponentMsg)

	if err != nil {
		fmt.Println("dealData err=======>:", err)
	}

	if userMsg.Msg != "" {
		tranMsg.Websocket.SecConnectionID = connectionID
		userMsgRes, err := json.Marshal(userMsg)
		if err != nil {
			fmt.Println("json.Marshal err=======>:", err)
		}
		tranMsg.Websocket.Data = string(userMsgRes)
		// 回推消息给当前连接的客户端
		fmt.Println("回推消息给当前连接的客户端=======>:", string(userMsgRes))
		send(internalDomainURL, tranMsg)
	}

	// 如果匹配到对手，向对手推送消息
	if len(roomMap[opponentMsg.RoomID]) >= 2 {
		tranMsg.Websocket.SecConnectionID = clients[opponentMsg.ClientID]
		opponentMsgRes, err := json.Marshal(opponentMsg)
		if err != nil {
			fmt.Println("json.Marshal err=======>:", err)
		}
		tranMsg.Websocket.Data = string(opponentMsgRes)
		fmt.Println("如果匹配到对手，向对手推送消息=======>:", string(opponentMsgRes))
		send(internalDomainURL, tranMsg)
	}

	return "send success", nil
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
