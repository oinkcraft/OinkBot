const config = require('../../config.json');
const YouTube = require('discord-youtube-api');
const fs = require('fs');

// Go ahead and create a thing to actually check for videos
const youtube = new YouTube(config.bot.integrations.youtube.key);

// Check for new videos from respective playlists
async function getLatestLifestyleVid(client) {
    // Read file (done here so it can be re-read; not the most elegant solution, probably)
    const latestVideoIds = require('../util/videos.json');

    // Retrieve the playlist and video details
    let playlist = await youtube.getPlaylistByID(config.bot.integrations.youtube.playlistIDs.lifestyle)
    let latestVidInPlaylist = playlist[0]
    
    // Check name
    if(latestVidInPlaylist.title.toLowerCase().includes("devlog")) {
        // Devlog video check
        let latestExistingVideoID = latestVideoIds["latestVideos"].devlog
        if(latestVidInPlaylist.id === latestExistingVideoID) {
            return 0
        } else {
            // Save video id and title
            let vidID = latestVidInPlaylist.id
            let vidTitle = latestVidInPlaylist.title
    
            // Construct the message
            let msg = `<@&${config.bot.integrations.youtube.notifRoles.devlog}> **NEW DEVLOG!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`
    
            // Send the video to the channel
            client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)
    
            // Reset latest vid in videos.json
            latestVideoIds["latestVideos"].devlog = latestVidInPlaylist.id
            let newData = JSON.stringify(latestVideoIds)
            fs.writeFile('./bot/util/videos.json', newData, (err) => {
                if (err) {
                    throw err;
                }
            })
            return 1
        } 
    } else {
        // Normal video check
        let latestExistingVideoID = latestVideoIds["latestVideos"].lifestyle
        if(latestVidInPlaylist.id === latestExistingVideoID) {
            return 0
        } else {
            // Save video id and title
            let vidID = latestVidInPlaylist.id
            let vidTitle = latestVidInPlaylist.title

            // Construct the message
            let msg = `<@&${config.bot.integrations.youtube.notifRoles.lifestyle}> **NEW VIDEO!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`

            // Send the video to the channel
            client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)

            // Reset latest vid in videos.json
            latestVideoIds["latestVideos"].lifestyle = latestVidInPlaylist.id
            let newData = JSON.stringify(latestVideoIds)
            fs.writeFile('./bot/util/videos.json', newData, (err) => {
                if (err) {
                    throw err;
                }
            })
            return 1
        } 
    }
}

async function getLatestCowdinoVid(client) {
    // Read file (done here so it can be re-read; not the most elegant solution, probably)
    const latestVideoIds = require('../util/videos.json');

    // Retrieve the playlist and video details
    let playlist = await youtube.getPlaylistByID(config.bot.integrations.youtube.playlistIDs.cowdino)
    let latestVidInPlaylist = playlist[0]

    // Check name
    if(latestVidInPlaylist.title.includes("VGT")) {
        // VGT video check
        let latestExistingVideoID = latestVideoIds["latestVideos"].vgt
        if(latestVidInPlaylist.id === latestExistingVideoID) {
            return 0
        } else {
            // Save video id and title
            let vidID = latestVidInPlaylist.id
            let vidTitle = latestVidInPlaylist.title
    
            // Construct the message
            let msg = `<@&${config.bot.integrations.youtube.notifRoles.lifestyle}> **NEW VIDEO GAME THERAPY!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`
    
            // Send the video to the channel
            client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)
    
            // Reset latest vid in videos.json
            latestVideoIds["latestVideos"].vgt = latestVidInPlaylist.id
            let newData = JSON.stringify(latestVideoIds)
            fs.writeFile('./bot/util/videos.json', newData, (err) => {
                if (err) {
                    throw err;
                }
            })
            return 1
        } 
    } else {

        // Normal video check
        let latestExistingVideoID = latestVideoIds["latestVideos"].cowdino
        if(latestVidInPlaylist.id === latestExistingVideoID) {
            return 0
        } else {
            // Save video id and title
            let vidID = latestVidInPlaylist.id
            let vidTitle = latestVidInPlaylist.title

            // Construct the message
            let msg = `<@&${config.bot.integrations.youtube.notifRoles.lifestyle}> **NEW COWDINO ARCADE VIDEO!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`

            // Send the video to the channel
            client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)

            // Reset latest vid in videos.json
            latestVideoIds["latestVideos"].cowdino = latestVidInPlaylist.id
            let newData = JSON.stringify(latestVideoIds)
            fs.writeFile('./bot/util/videos.json', newData, (err) => {
                if (err) {
                    throw err;
                }
            })
            return 1
        } 
    }

}

/* devlog and vgt specific checks 
If the latest lifestyle video has devlog in it, we post devlog style.
If the latest cowdino video has VGT in it, we post vgt style.

The functions will come back if there is ever a more specific way to reverse playlists and whatnot.

async function getLatestVGT(client) {
    // Read file (done here so it can be re-read; not the most elegant solution, probably)
    const latestVideoIds = require('../util/videos.json');

    // Retrieve the playlist and video details
    let playlist = await youtube.getPlaylistByID(config.bot.integrations.youtube.playlistIDs.vgt)
    let latestExistingVideoID = latestVideoIds["latestVideos"].vgt
    let latestVidInPlaylist = playlist[0]

    if(latestVidInPlaylist.id === latestExistingVideoID) {
        return
    } else {
        // Save video id and title
        let vidID = latestVidInPlaylist.id
        let vidTitle = latestVidInPlaylist.title

        // Construct the message
        let msg = `<@&${config.bot.integrations.youtube.notifRoles.lifestyle}> **NEW VIDEO GAME THERAPY!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`

        // Send the video to the channel
        client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)

        // Reset latest vid in videos.json
        latestVideoIds["latestVideos"].vgt = latestVidInPlaylist.id
        let newData = JSON.stringify(latestVideoIds)
        fs.writeFile('./bot/util/videos.json', newData, (err) => {
            if (err) {
                throw err;
            }
        })
    } 

} 

async function getLatestDevlog(client) {
    // Read file (done here so it can be re-read; not the most elegant solution, probably)
    const latestVideoIds = require('../util/videos.json');

    // Retrieve the playlist and video details
    //let playlist = await youtube.getPlaylistByID(config.bot.integrations.youtube.playlistIDs.devlog)
    let playlist = 
    let latestExistingVideoID = latestVideoIds["latestVideos"].devlog
    let latestVidInPlaylist = playlist[0]

    if(latestVidInPlaylist.id === latestExistingVideoID) {
        return
    } else {
        // Save video id and title
        let vidID = latestVidInPlaylist.id
        let vidTitle = latestVidInPlaylist.title

        // Construct the message
        let msg = `<@&${config.bot.integrations.youtube.notifRoles.devlog}> **NEW DEVLOG!**\n\n_${vidTitle}_\n\n:link: https://www.youtube.com/watch?v=${vidID}`

        // Send the video to the channel
        client.channels.cache.get(config.bot.channels.contentnotifchannel).send(msg)

        // Reset latest vid in videos.json
        latestVideoIds["latestVideos"].devlog = latestVidInPlaylist.id
        let newData = JSON.stringify(latestVideoIds)
        fs.writeFile('./bot/util/videos.json', newData, (err) => {
            if (err) {
                throw err;
            }
        })
    } 

}
*/

let client = {}
async function getLatestVids(){
    console.log("Checking for latest videos...")
    let lfVids = getLatestLifestyleVid(client);
    //getLatestDevlog(client);
    let caVids = getLatestCowdinoVid(client);
    //getLatestVGT(client);
    if (lfVids == caVids == 0) {
        console.log("No latest videos found.")
    } else {
        console.log("Latest vids found! Messages posted to channel.")
    }
}

// Start function and exporting the page
function start(clientRef) {
    console.log('Video notifier started!')
    client = clientRef
    // Run checks every hour and send message if the latest video is different (1hr == 1000 * 3600 milliseconds)
    // You can assign the function to a variable in case we need to be able to yeet it later. Maybe optimize to stop on nights or something
    getLatestVids()
    setInterval(getLatestVids, 1000 * 1800) // Check every 30 mins
}

module.exports.start = start;