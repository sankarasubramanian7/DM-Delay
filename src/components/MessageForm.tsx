import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'

const MessageForm = () => {

    const [message, setMessage] = useState<string>("");
    const [delay, setDelay] = useState<number>(10);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [sendMessage, setSendMessage] = useState<string>("");

    const handleSend  = () => {
        setIsSending(true)

        const id = setTimeout(() => {
         setSendMessage(message);
         setMessage("");
         setIsSending(false);
        }, delay * 1000)

        setTimerId(id)
    }

    const handleCancel = () => {
        if(timerId) clearTimeout(timerId);
        setIsSending(false);
    }

  return (
    <div className='max-w-md mx-auto mt-20 p-6 rounded-lg shadow-sm bg-white space-y-4'>
        <h2 className='text-2xl font-bold text-gray-700'>Dm Delay Button</h2>

        <Textarea
        placeholder='Type your message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)} />

        <Input type='number'
        placeholder='Delay in seconds'
        value={delay}
         onChange={(e) => setDelay(Number(e.target.value))}
         disabled={isSending} />
          

         {!isSending ? (
  <Button
    className="w-full bg-black text-white"
    onClick={handleSend}
  >
    Send with Delay
  </Button>
) : (
  <Button
    className="w-full bg-red-600 hover:bg-red-700 text-white"
    variant="destructive"
    onClick={handleCancel}
  >
    Cancel Sending
  </Button>
)}


        {sendMessage && (
            <div className='bg-green-100  rounded p-3 text-green-900' >
              <p className='font-semibold'>Message Sent !</p>
              <p>{sendMessage}</p>
            </div>
        )}

    </div>
  )
}

export default MessageForm