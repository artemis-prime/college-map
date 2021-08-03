export default interface School {
  id: number
  name: string
  location?: {lat: number, lng: number}
}