const presence = new Presence({
    clientId: '928112446831468616'
}), timestamp = Math.floor(Date.now() / 1000);
presence.on('UpdateData', async () => {
    const showTimestamp = await presence.getSetting('timestamp'), showButtons = await presence.getSetting('buttons'), showCvButton = await presence.getSetting('cvButton'), presenceData = {
        largeImageKey: 'logo',
        startTimestamp: timestamp
    }, curLocation = document.location.pathname, hostName = document.location.hostname;
    if (hostName === "dscjobs.org") {
        if (curLocation === '/') {
            presenceData.details = '👀 Viewing: Home Page';
            presenceData.state = 'What are you doing though?';
            presenceData.smallImageKey = 'idle';
            presenceData.smallImageText = '🎉 Being Cool!';
            presenceData.buttons = [
                {
                    label: 'Visit DscJobs',
                    url: 'https://dscjobs.org'
                }
            ];
        }
        else if (curLocation.includes('/search')) {
            const [search] = document.location.href.split('term=')[1].split('&'), [page] = document.location.href.split('page=')[1].split('&');
            presenceData.details = `🔍 Searching: ${search || 'Nothing'}`;
            presenceData.state = `📖 Results Page: ${page}`;
            presenceData.smallImageKey = 'search';
            presenceData.smallImageText = 'Searching for something!';
        }
        else if (curLocation === '/moderators') {
            const [modPage] = document.location.href.split('page=')[1].split('&'), filters = document.location.href.includes('&');
            presenceData.details = '👀 Viewing: Moderators';
            presenceData.state = `${filters ? `⚙️ Filters: true | 📖 Page: ${modPage}` : `⚙️ Filters: false | 📖 Page: ${modPage}`}`;
            presenceData.smallImageKey = 'mods';
            presenceData.smallImageText = 'Looking for a new Mod!';
            presenceData.buttons = [
                {
                    label: "View this Page!",
                    url: document.location.href
                }
            ];
        }
        else if (curLocation.includes('/developers')) {
            const [devPage] = document.location.href.split('page=')[1].split('&'), filters = document.location.href.includes('&');
            presenceData.details = '👀 Viewing: Developers';
            presenceData.state = `${filters ? '⚙️ Filters: true' : `📖 Page: ${devPage}`}`;
        }
        else if (curLocation.includes('/premium')) {
            presenceData.details = '👀 Viewing: Premium';
            presenceData.smallImageKey = 'premium';
            presenceData.smallImageText = 'Do it. You know you wanna!';
            presenceData.buttons = [
                {
                    label: 'DscJobs Premium',
                    url: document.location.href
                }
            ];
        }
        else if (curLocation.includes('/partners')) {
            presenceData.details = '👀 Viewing: Partners';
            presenceData.smallImageKey = 'partners';
            presenceData.smallImageText = 'Maybe you should Join 😏';
            presenceData.buttons = [
                {
                    label: "DscJobs Partners",
                    url: document.location.href
                }
            ];
        }
        else if (curLocation.includes('/profile')) {
            presenceData.details = '👀 Viewing: My Profile!';
            presenceData.smallImageKey = 'profile';
            presenceData.smallImageText = 'Admiring their own looks lol!';
        }
        else if (curLocation.includes('/u/')) {
            const username = document.querySelector('h1')?.textContent.split('#')[0];
            presenceData.details = `👀 Viewing: User profile`;
            presenceData.state = `👤 User: ${username}`;
            presenceData.smallImageKey = 'profile';
            presenceData.smallImageText = 'Wow you stalker!';
        }
        else if (curLocation.includes('/vote')) {
            const usernameVote = document.querySelector('h1').textContent;
            presenceData.details = `📈 Voting for: ${usernameVote || 'No one lol. Made you look'}`;
            presenceData.smallImageKey = 'vote';
            presenceData.smallImageText = `Go ahead and Vote!`;
            if (usernameVote) {
                presenceData.buttons = [
                    {
                        label: `Vote for ${usernameVote}`,
                        url: document.location.href
                    }
                ];
            }
        }
        else if (curLocation.includes('/cv/')) {
            const cvPage = document.querySelector("h2.cursor")?.getAttribute("data-title"), likes = document.getElementById("likes_amount")?.getAttribute("data-title"), views = document.getElementById("views_amount")?.getAttribute("data-title");
            presenceData.details = `👀: ${cvPage}s resume`;
            presenceData.state = `👍 Likes: ${likes} | 👀 Views: ${views}`;
            if (showButtons) {
                if (showCvButton) {
                    presenceData.buttons = [
                        {
                            label: `View ${cvPage}s Resume!`,
                            url: document.location.href
                        }
                    ];
                }
            }
        }
        else if (curLocation.includes('/settings')) {
            presenceData.details = `👀 Viewing: Settings`;
            presenceData.state = `👨‍💻 Changing: Resume`;
        }
        else if (curLocation.includes('/terms')) {
            presenceData.details = '👀 Viewing: Terms';
            presenceData.state = `⚖️: Boring Legal Stuff`;
            presenceData.buttons = [
                {
                    label: 'View our TOS',
                    url: document.location.href
                }
            ];
        }
        else if (curLocation.includes('/privacy')) {
            presenceData.details = '👀 Viewing: Privacy';
            presenceData.state = `⚖️: Boring Legal Stuff`;
            presenceData.buttons = [
                {
                    label: 'View our Privacy Policy',
                    url: document.location.href
                }
            ];
        }
        else if (curLocation.includes('/reviews')) {
            presenceData.details = '👀 Viewing: Reviews Panel';
        }
        else if (curLocation.includes('/reports')) {
            presenceData.details = '👀Viewing: Reports Panel';
        }
        else if (curLocation.includes('/users')) {
            presenceData.details = '👀 Viewing: Members Panel';
        }
        else if (curLocation.includes('/panel')) {
            presenceData.details = '👀 Viewing: Staff Panel';
        }
        else if (curLocation.includes('/secret')) {
            presenceData.details = '👀 Viewing: DscJobs Assets';
            presenceData.state = '📍 Location: Static Directory';
        }
    }
    if (!showButtons)
        delete presenceData.buttons;
    if (showTimestamp)
        presenceData.startTimestamp = timestamp;
    if (!presenceData.details) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
});
