class ArticleDetail:
    """
    A article detail object is an instance of value in ArticleDetail 
    table where store parameters which its value changes through time 

    """

    def __init__(
        self,
        _id: str = None,
        article_id: str = None,
        likeRate: int = 0,
        taking_datetime: str = None,
        likeUrl: str = None,
    ) -> None:
        self._id = _id
        self.article_id = article_id
        self.likeRate = (0,)
        self.taking_datetime = taking_datetime
        self.likeUrl = likeUrl
