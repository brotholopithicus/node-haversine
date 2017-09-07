function Haversine(...opts) {
  this.opts = opts;
  this.radii = {
    km: 6371,
    miles: 3960,
    meters: 6371000,
    nmi: 3440,
    feet: 20908800,
    yards: 6969600
  }
  this.toRad = deg => (deg * Math.PI) / 180;
  this.toDeg = rad => (rad * 180) / Math.PI;
}

Haversine.prototype.distance = function(start, end, options = this.opts) {
  const R = options.unit ? this.radii[options.unit] : this.radii.km;

  const dLat = this.toRad(end.latitude - start.latitude);
  const dLon = this.toRad(end.longitude - start.longitude);
  const lat1 = this.toRad(start.latitude);
  const lat2 = this.toRad(end.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

Haversine.prototype.targetCoordinates = function(current, target, options = this.opts) {
  const R = options.unit ? this.radii[options.unit] : this.radii.km;

  const { distance, heading } = target;
  const { latitude, longitude } = current;

  const bearing = this.toRad(heading);

  const lat1 = this.toRad(latitude);
  const lon1 = this.toRad(longitude);

  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / R) +
    Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing));

  const lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) *
    Math.cos(lat1), Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2));

  return {
    latitude: this.toDeg(lat2),
    longitude: this.toDeg(lon2)
  }
}

module.exports = Haversine;
