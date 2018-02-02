export class MapStateService {
  _points: any[] = [];
  get points() {
    return this._points;
  }
  addPoint(point: any) {
    this.points.push(point);
  }
}
