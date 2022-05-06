const { inspect } = require('node:util');
const { SuperfaceClient } = require('@superfaceai/one-sdk');
const { withAccessToken } = require('../utils/tokens-utils');
const fs = require('fs/promises');

const provider = 'pinterest';
const sdk = new SuperfaceClient();

const publishPost = async (profileId, fileOrUrl) => {
  const media = {
    url: undefined,
    contents: undefined,
    altText: 'Some alt text',
  };

  if (fileOrUrl.startsWith('http')) {
    media.url = fileOrUrl;
  } else {
    media.contents = await fs.readFile(fileOrUrl);
  }

  const input = {
    profileId,
    text: 'Some description',
    link: 'https://example.com',
    media: [media],
  };
  try {
    const profile = await sdk.getProfile('social-media/publish-post');
    const result = await withAccessToken((accessToken) =>
      profile.getUseCase('PublishPost').perform(input, {
        provider,
        parameters: {
          accessToken,
        },
      })
    );
    console.log(inspect(result.unwrap(), false, Infinity, true));
  } catch (err) {
    console.error(inspect(err, false, Infinity, true));
  }
};

const profileId = process.argv[2];
const fileOrUrl = process.argv[3] || 'https://placekitten.com/200/300';

publishPost(profileId, fileOrUrl);
