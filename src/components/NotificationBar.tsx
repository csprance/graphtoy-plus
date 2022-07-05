import * as React from 'react';

interface Props {
  // The message to notify about
  message: string;
  // A CSS Color String
  color: string;
}
const NotificationBar: React.FC<Props> = ({ message }) => {
  return <div></div>;
};

export default NotificationBar;
