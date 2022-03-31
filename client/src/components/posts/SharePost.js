import React from 'react';

import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';

const SharePost = ({ url }) => {
    return (
        <div className='d-flex justify-content-between p-2 mb-2 share-post rounded-3'>
            <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={32} />
            </TwitterShareButton>

            <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={32} />
            </TelegramShareButton>

            <EmailShareButton url={url}>
                <EmailIcon round={true} size={32} />
            </EmailShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={32} />
            </WhatsappShareButton>

            <LinkedinShareButton url={url}>
                <LinkedinIcon round={true} size={32} />
            </LinkedinShareButton>

            <RedditShareButton url={url}>
                <RedditIcon round={true} size={32} />
            </RedditShareButton>
        </div>
    );
};

export default SharePost;
