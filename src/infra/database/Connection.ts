export default interface Connection {
  close(): Promise<void>;
}
