from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    score = sia.polarity_scores(text)
    if score['compound'] > 0:
        return "Positive"
    elif score['compound'] < 0:
        return "Negative"
    else:
        return "Neutral"




