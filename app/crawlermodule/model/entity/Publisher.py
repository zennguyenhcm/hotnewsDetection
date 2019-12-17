class Publisher:
    def __init__(
        self,
        _id: str = None,
        name: str = None,
        url: str = None,
    ) -> None:
        self._id=_id
        self.name=name
        self.url=url