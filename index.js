
const GoogleHome = require("google-home-push");
const Axios = require('axios')

require('dotenv').config()

if (!process.env.GOOGLE_HOME_IP || !process.env.GITHUB_TOKEN) throw new Error('Rename .env_default and add your details')

// Pass the name or IP address of your device
const googleHomeInstance = new GoogleHome(process.env.GOOGLE_HOME_IP);

const idsThatHaveBeenRead = []

const check = async () => {
    console.log('Checking')

    const config = {
        headers: { 
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    };

    const { data: allNotifications} = await Axios.get('https://api.github.com/notifications', config)
    const notifications = allNotifications.filter(({id}) => !idsThatHaveBeenRead.includes(id))
    const count = notifications.length

    if (count === 0) {
        console.log('No new notifications!')
        return
    }

    let textToSend = `You have ${count} new github ${count > 1 ? 'notifications' : 'notification'}. `
    
    let index = 0
    for (const notification of notifications) {
        textToSend += ++index + '. '
        textToSend += 'Reason: ' + notification.reason + '. '
        textToSend += 'Type: ' + notification.subject.type + '. '
        textToSend += 'Title: ' + notification.subject.title + '. '
        idsThatHaveBeenRead.push(notification.id)
    }

    googleHomeInstance.speak(textToSend)
}

check()
setInterval(check, 60 * 1000)
