var request = require("request");

var options = { 
  method: 'GET',

  //url: 'https://twitter.com/i/api/2/search/adaptive.json',
  //url:'http://www.baidu.com',
  url:'http://www.google.com',
  qs: 
   { include_profile_interstitial_type: '1',
     include_blocking: '1',
     include_blocked_by: '1',
     include_followed_by: '1',
     include_want_retweets: '1',
     include_mute_edge: '1',
     include_can_dm: '1',
     include_can_media_tag: '1',
     include_ext_has_nft_avatar: '1',
     skip_status: '1',
     cards_platform: 'Web-12',
     include_cards: '1',
     include_ext_alt_text: 'true',
     include_quote_count: 'true',
     include_reply_count: '1',
     tweet_mode: 'extended',
     include_entities: 'true',
     include_user_entities: 'true',
     include_ext_media_color: 'true',
     include_ext_media_availability: 'true',
     include_ext_sensitive_media_warning: 'true',
     include_ext_trusted_friends_metadata: 'true',
     send_error_codes: 'true',
     simple_quoted_tweet: 'true',
     q: 'wfg',
     count: '20',
     query_source: 'typed_query',
     cursor: 'scroll:thGAVUV0VFVBYBFoCQkMawzJWJKhIYzAUAAAAALo2zCAAAAGUAAAAAAAAVfAAAAAcAAABWGQIAgAAAAADCQEAAYAgIKAAAAAIAQAERAAQEgAAAIAAhDEAAAAjEAIAEAQAAZIBwAQgIAgAIAkmAEAEAFIAAAIARAEAUkABAgIIDCgAAAAAIAwQCAAQAEFwACACiAAUkAgAYAAEAAKg0AUQAQIhAEcEBKJCAAIAQsAaIEACAIAAAAFAAQIgIQAAAAAAAQCAAECQAACgkABAAAAIAAIkAEABAAEgAyQAogCUBAkihEBgAEAAAAAAAAAAAACAQAAIgQAAhkEAEACMEAIAIACUAAIAgSoBCEAAAIAAAAAAAJAARCcAcACCAAACAJYAAECEADECAFEIADAAHIEBgNDAgASIQABAAAACAEEGSAAgFEAAAABgAwhIAAAEAggAAQpEAzAAACQwACAkAgAIAAAwAQAFNAYAACFAAAAABWAEEAABAAAAAgJCpCAAkgAABAAgEAECgIAAAAhAAAAQBgCABABAwADAACAMCIgAAQAACBCCCkABAAAAQAgAgEABABCAIACggAAEADBYAkARIioEAQACQAAAEAAYAEKyYBgCAAAAFIgBCAIAIKABAGCAgAEABACAEKAQgYCACgACAAwIiIEDAlAVBAACAMAAQAAAAQIABgBAAAAIgAAAJBFEAAAIAAAAiLgQAAAAAABCAAAAEAAoAAABEAAgJAAgGEICAIgEABAAAAEEAQQggQBAYEQAACoCMDEAAQhSARFAAAAAAQAAIIAgAAAAAgAggAERCoiIIAICgAkAgiAAgAAAAAQEAUICAAAEEAQAAIBACJkAAQEQFQAABgBEACBAAAAFAAAEkASgCAAAECIAABBAAEAiAiBQIAEAAQgAAgBAAAgAEAoCACAYCAAKAADIIEAUAQABBMAIIyAABAAAAQAAAgQCACAgAAAAAAggBAgEYACCHIGEVnPl5FYCJehgHREVGQVVMVDXKARUIFQAA',
     pc: '1',
     spelling_corrections: '1',
     ext: 'mediaStats,highlightedLabel,hasNftAvatar,voiceInfo,enrichments,superFollowMetadata,unmentionInfo' },
  headers: 
   { 'postman-token': '2cde6540-232e-4bce-f36d-b43c88a92b9d',
     'cache-control': 'no-cache',
     'sec-fetch-dest': 'empty',
     'sec-fetch-mode': 'cors',
     'sec-fetch-site': 'same-origin',
     accept: '*/*',
     'sec-ch-ua-platform': '\\"Windows\\"',
     'x-twitter-active-user': 'yes',
     'x-twitter-auth-type': 'OAuth2Session',
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
     authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
     'sec-ch-ua-mobile': '?0',
     'x-csrf-token': '716fa807944d89694ef90d1e30ec8d1ef8f397b12c3c9c364db93d482c418b2516eb587ed7156318b1c91c559939d2fd623c6cd2d2896e6b7fac7104015fc6c01866a1b7c30b58a927c7bb9e1c5ba451',
     'x-twitter-client-language': 'en',
     'sec-ch-ua': '\\" Not A;Brand\\";v=\\"99\\", \\"Chromium\\";v=\\"98\\", \\"Google Chrome\\";v=\\"98\\"' } };

request(options, function (error, response, body) {
  if (error) console.log(error)

  console.log(body);
});
