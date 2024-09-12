export default interface MessageType {
  id: string;
  created_at: string;
  text: string;
  send_by: string;
  username?: string;
}