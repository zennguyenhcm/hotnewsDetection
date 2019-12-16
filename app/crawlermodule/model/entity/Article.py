class Article:
    def __init__(
        self,
        _id: str = None,
        title: str = None,
        pubDate: str = None,
        content: str = None,
        url: str = None,
        description: str = None,
        tags: str = None,
        category_id: str = None,
        publisher_id: str = None,
    ) -> None:
        self._id = _id
        self.title = title
        self.pubDate = pubDate
        self.content = content
        self.url = url
        self.description = description
        self.tags = tags
        self.category_id = category_id
        self.publisher_id = publisher_id

    # just for debug
    def article_to_string(self):
        return "_____".join(
            (
                self._id,
                self.title,
                self.pubDate,
                self.content,
                self.url,
                self.description,
                self.tags,
                self.category_id,
                self.publisher_id,
            )
        )

