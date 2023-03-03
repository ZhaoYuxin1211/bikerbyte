class Station:
    def __init__(self, number, address, banking, bike_stands, name, position_lat, position_lng):
        self.number = number
        self.address = address
        self.banking = banking
        self.bikeStands = bike_stands
        self.name = name
        self.positionLat = position_lat
        self.positionLng = position_lng
        self.lastUpdate = 0
        self.availableBikes = 0
        self.availableBikeStands = 0
        self.status = 0

    def getAvailability(self, last_update, availableBikes, availableBikeStands, status):
        self.lastUpdate = last_update
        self.availableBikes = availableBikes
        self.availableBikeStands = availableBikeStands
        self.status = status

    def __str__(self) -> str:
        return str(self.number) + ", " + self.name +","+ self.address +","+ str(self.availableBikes)+","+str(self.lastUpdate)
