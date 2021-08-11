#### Codecademy practice project:
# Reddit minimal: Top Subreddits

This project uses the [Reddit JSON API](https://github.com/reddit-archive/reddit/wiki/JSON) that doesn't require authentication.
The prechosen subreddits are largely design related.

## Design Features
#### – Flex Masonry Grid
The subreddit list layout uses a flex masonry grid. While pure css masonry grids order the cards column wise, the cards in this layout are displayed row wise. The masonry grid is implemented using translationY. The values are calculated with Javascript on every render.

## Included libraries
#### – Framer Motion
Uses [Framer motion](https://www.framer.com/motion/) for a smooth transition of the post details 
#### – Simplebar
Uses [SimplebarReact](https://www.npmjs.com/package/simplebar-react) for a custom scrollbar in the subreddit navigtion
