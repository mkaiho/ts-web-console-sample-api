export default abstract class AbstractError extends Error {
  constructor(message?: string) {
    super(message)
    super.name = new.target.name
  }
}
