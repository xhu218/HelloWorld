import requests
from bs4 import BeautifulSoup

class TwitterHashTagPosts:

    def __init__(self, hashtag):
        self.hashtag = hashtag
        self.tweets = []
        self.url = "https://mobile.twitter.com/hashtag/" + self.hashtag.strip()

    def scrape_tweets(self):
        content = requests.get(self.url)
        soup = BeautifulSoup(content.text, "html.parser")
        tweet_divs = soup.select("#main_content")[0].select(".tweet")
        for tweet in tweet_divs:
            handle = tweet.find("div", {"class": "username"}).text.replace("\n", " ").strip()
            post = tweet.find("div", {"class": "tweet-text"}).text.replace("\n", " ").strip()
            self.tweets.append({handle: post})
        return self.tweets

x = TwitterHashTagPosts("tiktokrating")
x.scrape_tweets()