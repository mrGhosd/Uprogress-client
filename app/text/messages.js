const messages = {
  server_error: {
    title: 'Server error',
    text: 'Unfortunately, something goes wrong. Try to repeate your request'
  },
  user_404: {
    title: 'User not found',
    text: 'There is no such user'
  },
  direction_404: {
    title: 'Direction not found',
    text: 'There is no such direction'
  },
  directionCreateSuccess: {
    title: 'Direction created',
    text: 'Direction was succesfylly created'
  },
  directionUpdateSuccess: {
    title: 'Direction updated',
    text: 'Direction was succesfully updated'
  },
  stepUpdateSuccess: {
    title: 'Step updated',
    text: 'Step was succesfully updated'
  },
  stepDeleteSuccess: {
    title: 'Step deleted',
    text: 'Step was succesfully deleted'
  },
  imageSuccessUpload: {
    title: 'Image uploaded',
    text: 'Image was succesfully uploaded'
  },
  imageFailureUpload: {
    title: 'Image didn\'t uploaded',
    text: 'Unfortunately, image have not been uploaded. Pleas try it later'
  },
  userSuccessUpdate: {
    title: 'Profile updated',
    text: 'Your profile succesfully updated'
  },
  userFailureUpdate: {
    title: 'Profile didn\'t updated',
    text: 'Unfortunately, profile have not been updated. Pleas try it later'
  },
  restorePasswordSuccess: {
    title: 'Success',
    text: 'Mail was succesfully sended'
  },
  resetPasswordSuccess: {
    title: 'Success',
    text: 'You succesfully update password'
  },
  appointmentSuccessCreation: {
    title: 'Success',
    text: 'You succesfully create appointment for direction'
  },
  appointmentSuccessUpdate: {
    title: 'Success',
    text: 'Appointment was succesfully updated'
  },
  appointmentSuccessDelete: {
    title: 'Success',
    text: 'Appointment was succesfully deleted'
  },
  successNotificationUpdate: {
    title: 'Success',
    text: 'Notification was succesfully updated'
  },
  failedNotificationUpdate: {
    title: 'Failure',
    text: 'A problem has occured'
  }
};

export default messages;
