function bis_bluesky_domain(url) {
    if (url.search("bsky.app")) {
        return true
    }
    else {
        return false
    }
}

function fetch_document_from_tab(tab) {
    var fetch_document_result
    browser.tabs.executeScript({ tabid: tab.id, code: "return document" }).then(
        document => {
            fetch_document_result = document
        },
        error => {
            console.log(error)
            return null
        });
    return fetch_document_result
}

function fetch_by_html_tag(document, tag) {
    if (document && tag && tag in valid_html5_tags) {
        return document.getElementsByTagName(tag)
    }

}

module.exports = { fetch_document_from_tab, bis_bluesky_domain, fetch_by_html_tag };

