'use client'

import { createTopicAction } from '@/actions/payloadActions'

export default function PageClient() {
  async function handleAction() {
    const topics = await createTopicAction({
      title: 'Victor de aldama va a tope',
      source: 'www.efe.com',
      topicStatus: 'unwritten',
    })
    console.log('Fetched Topics:', topics)
  }
  return (
    <div>
      <button
        onClick={handleAction}
        className="px-2 py-1  rounded bg-primary-500 hover:bg-primary-800 text-main-100"
      >
        CreateTopic{' '}
      </button>
    </div>
  )
}
