const { bis_bluesky_domain, fetch_by_html_tag, fetch_document_from_tab } = require("./bsky_utils.js");

browser.action.onClicked.addListener((tab) => {
    browser.action.setPopup({ popup: "../page/extension_popup.html" })
    browser.action.openPopup()

    browser.action.getPopup().then((document) => {
        var videos = bsky_video_query(tab)

        var bksy_video_ol = document.getElementById("bsky_video_list")

        for (element of videos) {
            var video_entry_li = document.createElement("li")
            var thumbnail = document.createElement({ tagname: "img" }, { src: element["video_thumbnail"] })
            video_entry_li.appendChild(thumbnail)
            bksy_video_ol.appendChild(video_entry_li)
        }
    })
});




function bsky_video_query(tab) {
    if (bis_bluesky_domain(tab.url)) {
        var html_video_tags = fetch_by_html_tag(fetch_document_from_tab(tab), "video")
        var fetched_videos = {}

        if (html_video_tags.length > 0) {
            for (const [index, video_element] of html_video_tags.entries) {

                fetched_videos[index] = {
                    video_name: "", // get text from post by searching for parent div above video tag
                    video_thumbnail: video_element.getAttribute("poster") ? video_element.getAttribute("poster") : "",
                    video_content: ""
                }
            }
        }

        return fetched_videos
    }
}








// "content_scripts": [
//   {
//     "matches": [
//       "*://*bsky.app/*"
//     ],
//     "js": [
//       "/src/bsky_video_query.js"
//     ]
//   }
// ]