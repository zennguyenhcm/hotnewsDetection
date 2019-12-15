class Category:
    def __init__(
        self,
        _id: str = None,
        name: str = None,
        url: str = None,
        publisher_id: str = None,
    ) -> None:
        self._id = _id
        self.name = name
        self.url = url
        self.publisher_id = publisher_id

