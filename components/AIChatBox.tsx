'use client';

import { cn } from '@/lib/utils';
import {
  Bot,
  BrainCog,
  Expand,
  GlobeIcon,
  Minimize,
  SquareIcon,
  Trash,
  X,
  CopyIcon,
  RefreshCcwIcon,
  CheckIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Fragment, useState } from 'react';
import { useChat, type UIMessage as AIMessage } from '@ai-sdk/react';
// import { useUser } from '@clerk/nextjs';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from './ai-elements/conversation';
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from './ai-elements/message';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from './ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from './ai-elements/reasoning';
import { Loader } from './ai-elements/loader';
import Image from 'next/image';
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from '@/components/ai-elements/model-selector';

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const models = [
  {
    id: 'xai/grok-4-fast-reasoning',
    name: 'Grok 4 Fast Reasoning',
    chef: 'xAI',
    chefSlug: 'xai',
    providers: ['xai'],
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini Flash',
    chef: 'Google',
    chefSlug: 'google',
    providers: ['google'],
  },
  {
    id: 'perplexity/sonar',
    name: 'Perplexity Sonar',
    chef: 'Perplexity',
    chefSlug: 'perplexity',
    providers: ['perplexity'],
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT 4o mini',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai'],
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT 4o',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai'],
  },
  {
    id: 'openai/gpt-4.1-nano',
    name: 'GPT 4.1 Nano',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai'],
  },
  {
    id: 'deepseek/deepseek-r1',
    name: 'Deepseek R1',
    chef: 'DeepSeek',
    chefSlug: 'deepseek',
    providers: ['deepseek'],
  },
];

const chefs = ['xAI', 'Google', 'Perplexity', 'OpenAI', 'DeepSeek'];

export function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  //   const { user } = useUser();
  //   const firstName = user?.firstName;

  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<string>(models[0].id);
  // const [webSearch, setWebSearch] = useState(false);
  const [isCopied, setIsCopied] = useState<Record<string, boolean>>({});
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

  const {
    messages,
    sendMessage,
    status,
    regenerate,
    error,
    stop,
    setMessages,
  } = useChat();

  const selectedModelData = models.find((m) => m.id === model);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files,
      },
      {
        body: {
          model: model,
          // webSearch: webSearch,
        },
      }
    );
    setPrompt('');
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  if (!open) return null;

  const animationClasses = {
    'scale-blur': 'animate-in fade-in zoom-in duration-500 ease-out',
    'slide-rotate': 'animate-in slide-in-from-top duration-600 ease-out',
    'fade-slide-up': 'animate-in fade-in slide-in-from-bottom-10 duration-400',
    'glass-morph': 'animate-in fade-in duration-500 ease-out',
  };

  return (
    <div
      // className={cn(
      //   'animate-in slide-in-from-bottom-10 bg-card fixed right-4 bottom-4 z-50 flex flex-col rounded-lg border shadow-lg duration-300 2xl:right-16',
      //   isExpanded
      //     ? 'h-[950px] max-h-[90vh] w-[550px] max-w-[90vw]'
      //     : 'h-[500px] max-h-[80vh] w-92 sm:w-96'
      // )}
      className={cn(
        'animate-in slide-in-from-top-10 bg-card/80 absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 flex flex-col rounded-lg border shadow-lg duration-500 overscroll-contain',
        'max-w-[90vw]', // <-- 1. Apply max-width to the base
        isExpanded
          ? 'h-[950px] max-h-[90vh] w-[550px]' // <-- Removed max-w from here
          : 'h-[500px] max-h-[80vh] w-96' // <-- 2. Simplified to just w-96
      )}
    >
      <div className='bg-[#40C1AC] text-primary-foreground flex items-center justify-between rounded-t-lg border-b p-3'>
        <div className='flex items-center gap-2'>
          <BrainCog size={18} />
          <h3 className='font-medium'>Alevtina</h3>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-primary-foreground hover:bg-transparent h-8 w-8'
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize /> : <Expand />}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleClearChat}
            className='text-primary-foreground hover:bg-transparent h-8 w-8'
            title='Clear chat'
          >
            <Trash />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='text-primary-foreground hover:bg-transparent h-8 w-8'
          >
            <X className='size-4' />
          </Button>
        </div>
      </div>
      <div className='flex-1 space-y-4 overflow-y-auto overscroll-y-contain p-3'>
        <div className='max-w-4xl mx-auto relative size-full'>
          <Conversation className='h-full'>
            <ConversationContent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((message) => (
                <div key={message.id}>
                  {message.role === 'assistant' &&
                    message.parts.filter((part) => part.type === 'source-url')
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              (part) => part.type === 'source-url'
                            ).length
                          }
                        />
                        {message.parts
                          .filter((part) => part.type === 'source-url')
                          .map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}
                  {message.parts.map((part, i) => {
                    const partId = `${message.id}-${i}`;

                    switch (part.type) {
                      case 'text':
                        return (
                          <Fragment key={partId}>
                            <Message
                              from={message.role}
                              displayName={
                                message.role === 'assistant'
                                  ? 'Alevtina'
                                  : 'You'
                                //   : firstName || 'You'
                              }
                            >
                              <MessageContent>
                                <MessageResponse>{part.text}</MessageResponse>
                              </MessageContent>
                            </Message>
                            {message.role === 'assistant' &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id && (
                                <MessageActions>
                                  <MessageAction
                                    onClick={() => regenerate()}
                                    label='Retry'
                                  >
                                    <RefreshCcwIcon className='size-3' />
                                  </MessageAction>
                                  <MessageAction
                                    onClick={() => {
                                      navigator.clipboard.writeText(part.text);
                                      setIsCopied((prev) => ({
                                        ...prev,
                                        [partId]: true,
                                      }));
                                      setTimeout(
                                        () =>
                                          setIsCopied((prev) => ({
                                            ...prev,
                                            [partId]: false,
                                          })),
                                        1000
                                      );
                                    }}
                                    label={isCopied[partId] ? 'Copied' : 'Copy'}
                                  >
                                    {isCopied[partId] ? (
                                      <span className='text-xs'>Copied</span>
                                    ) : (
                                      <CopyIcon className='size-3' />
                                    )}
                                  </MessageAction>
                                </MessageActions>
                              )}
                          </Fragment>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className='w-full'
                            isStreaming={
                              status === 'streaming' &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      case 'file':
                        if (part.mediaType?.startsWith('image/')) {
                          return (
                            <Image
                              key={`${message.id}-${i}`}
                              src={part.url}
                              alt={part.filename ?? `Attachment ${i}`}
                              width={500}
                              height={500}
                            />
                          );
                        }
                        if (part.mediaType?.startsWith('application/pdf')) {
                          return (
                            <iframe
                              key={`${message.id}-${i}`}
                              src={part.url}
                              width={500}
                              height={600}
                              title={part.filename ?? `attachment-${i}`}
                            />
                          );
                        }
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {status === 'submitted' || (status === 'streaming' && <Loader />)}
              {error && (
                <Message from='assistant' displayName='Personal Banker'>
                  <MessageContent>
                    <div className='p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'>
                      <h4 className='font-bold mb-1'>An error occurred</h4>
                      <p className='text-sm'>{error.message}</p>
                    </div>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </div>
      <div className='border-t p-3'>
        {(status === 'submitted' || status === 'streaming') && (
          <div className='flex justify-center items-center p-4 bg-background'>
            <Button variant='secondary' onClick={stop}>
              <SquareIcon className='mr-2 size-4' />
              Stop generating
            </Button>
          </div>
        )}

        <PromptInput
          onSubmit={handleSubmit}
          className='mt-4'
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
          </PromptInputBody>

          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              {/* <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton> */}

              <ModelSelector
                onOpenChange={setModelSelectorOpen}
                open={modelSelectorOpen}
              >
                <ModelSelectorTrigger asChild>
                  <PromptInputButton>
                    {selectedModelData?.chefSlug && (
                      <ModelSelectorLogo
                        provider={selectedModelData.chefSlug}
                      />
                    )}
                    {selectedModelData?.name && (
                      <ModelSelectorName>
                        {selectedModelData.name}
                      </ModelSelectorName>
                    )}
                  </PromptInputButton>
                </ModelSelectorTrigger>

                {/* ---
                 👇 THIS IS THE FIX 
                --- */}
                <ModelSelectorContent side='top' align='end' sideOffset={5}>
                  <ModelSelectorInput placeholder='Search models...' />
                  <ModelSelectorList>
                    <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                    {chefs.map((chef) => (
                      <ModelSelectorGroup heading={chef} key={chef}>
                        {models
                          .filter((m) => m.chef === chef)
                          .map((m) => (
                            <ModelSelectorItem
                              key={m.id}
                              onSelect={() => {
                                setModel(m.id);
                                setModelSelectorOpen(false);
                              }}
                              value={m.id}
                            >
                              <ModelSelectorLogo provider={m.chefSlug} />
                              <ModelSelectorName>{m.name}</ModelSelectorName>
                              {model === m.id ? (
                                <CheckIcon className='ml-auto size-4' />
                              ) : (
                                <div className='ml-auto size-4' />
                              )}
                            </ModelSelectorItem>
                          ))}
                      </ModelSelectorGroup>
                    ))}
                  </ModelSelectorList>
                </ModelSelectorContent>
              </ModelSelector>
            </PromptInputTools>
            <PromptInputSubmit
              disabled={
                !prompt || status === 'submitted' || status === 'streaming'
              }
              status={status}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
