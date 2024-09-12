export const EmailTemplate = ({ 
  streamer
}: { 
  streamer: string,  
}) => {

  return (
    <div>
      <h1>{streamer} just went live!</h1>
      <p>
        Go check him out: LINK
      </p>
    </div>
  )
}