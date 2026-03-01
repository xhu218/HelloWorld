import requests
import json

# 替换成你的
WEBHOOK_URL = "https://oapi.dingtalk.com/robot/send?access_token=3677af4ef38ac3291bd64e17506a89b3a376679df65a8cca06ca3aee74a02d34"
YOUR_PHONE = "13548180218"  # 你的手机号（钉钉绑定的）

def send_alert(msg):
    headers = {"Content-Type": "application/json"}
    data = {
        "msgtype": "text",
        "text": {
            "content": f"小爱同学【告警】{msg}"
        },
        "at": {
            "atMobiles": [YOUR_PHONE],  # @你
            "isAtAll": False
        }
    }
    resp = requests.post(WEBHOOK_URL, data=json.dumps(data), headers=headers)
    return resp.json()

# ========== 你的触发逻辑 ==========
if __name__ == "__main__":
    # 这里写你的条件：比如监控、异常、超时、任务完成...
    need_call = True

    if need_call:
        # 发消息并@你 → 钉钉自动打电话给你
        result = send_alert("交警来了，快移车！")
        print("发送结果:", result)