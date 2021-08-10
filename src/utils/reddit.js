export const getSubredditData = (url, subreddit) => {

    const endpoint = `${url}${subreddit}.json?sort=top`;

    return fetch(endpoint)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then(jsonResponse => {
        const posts = jsonResponse.data.children;
        return posts.map(obj => {

            const post = obj.data;
            const hasImage = post?.preview?.images[0]?.resolutions[0] !== undefined;
            const hasVideo = post?.media?.reddit_video?.fallback_url !== undefined;
            const img_width = hasImage ? post.preview.images[0].resolutions[0].width : '';
            const img_height = hasImage ? post.preview.images[0].resolutions[0].height : '';
            const video_url = hasVideo ? post.media.reddit_video.fallback_url : '';
            const video_width = hasVideo ? post.media.reddit_video.width : '';
            const video_height = hasVideo ? post.media.reddit_video.height : '';
            const preview = post.preview?.images[0]?.resolutions[3];
            
            return {
                id: post.id,
                author: post.author,
                title: post.title,
                url: post.url,
                ups: post.ups,
                num_comments: post.num_comments,
                created_utc: post.created_utc,
                img_width: img_width,
                img_height: img_height,
                video_url: video_url,
                video_width: video_width,
                video_height: video_height,
                thumbnail: post.thumbnail,
                preview: preview
            }
        })
    })
}

export const getPostComments = (id, subreddit) => {

    const url = 'https://www.reddit.com/';
    const endpoint = `${url}${subreddit}/comments/${id}.json`;
    
    return fetch(endpoint)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then(jsonResponse => {
        const comments = jsonResponse[1].data.children;
        
        if (!comments[0]) return []

        return comments.map(obj => {
            const comment = obj.data;
            return {
                id: comment.id,
                author: comment.author,
                body: comment.body,
                created_utc: comment.created_utc
            }
        })
    })
}