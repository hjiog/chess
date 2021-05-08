package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/scf-go-lib/cloudevents/scf"
	"github.com/tencentyun/scf-go-lib/cloudfunction"
)

func main() {
	cloudfunction.Start(setID)
}

func setID(ctx context.Context, event scf.APIGatewayWebSocketConnectionRequest) (string, error) {
	fmt.Printf("ctx:%v\n", ctx)
	fmt.Printf("event:%v\n", event)
	fmt.Printf("SecConnectionID:%v\n", event.WebSocketConn.SecConnectionID)
	var (
		bucket      string
		region      string
		mySecretID  string
		mySecretKey string
	)
	bucket = os.Getenv("bucket")
	region = os.Getenv("region")
	mySecretID = os.Getenv("secret_id")
	mySecretKey = os.Getenv("secret_key")

	myBucketURL := "https://" + bucket + ".cos." + region + ".myqcloud.com"

	fmt.Println("myBucketURL=============>:", myBucketURL)
	fmt.Println("mySecretID=============>:", mySecretID)
	fmt.Println("mySecretKey=============>:", mySecretKey)

	u, _ := url.Parse(myBucketURL)
	b := &cos.BaseURL{BucketURL: u}
	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  mySecretID,
			SecretKey: mySecretKey,
		},
	})
	newRegMsg := scf.APIGatewayWebSocketConnectionResponse{}
	connectionID := event.WebSocketConn.SecConnectionID
	newRegMsg.ErrNumber = 0
	newRegMsg.ErrMesg = "ok"
	newRegMsg.WebSocketConn.Action = "connecting"
	newRegMsg.WebSocketConn.SecConnectionID = connectionID

	// 通过字符串上传对象
	f := strings.NewReader("ws")

	_, err := c.Object.Put(context.Background(), connectionID, f, nil)
	if err != nil {
		panic(err)
	}
	res, err := json.Marshal(newRegMsg)
	if err != nil {
		panic(err)
	}
	resp := string(res)
	return resp, nil
}
