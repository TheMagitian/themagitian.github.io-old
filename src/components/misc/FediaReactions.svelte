<script lang="ts">
import { onMount } from 'svelte'

export let url: string

interface Account {
  id: string
  username: string
  display_name: string
  avatar: string
  url: string
}

interface Reaction {
  name: string
  count: number
  me: boolean
  url: string | null
  static_url: string | null
}

interface MediaAttachment {
  id: string
  type: string
  url: string
  preview_url: string
  description: string | null
}

interface Status {
  id: string
  content: string
  account: Account
  created_at: string
  favourites_count: number
  reblogs_count: number
  replies_count: number
  reactions: Reaction[]
  media_attachments: MediaAttachment[]
}

let loading = false
let loaded = false
let error = ''
let replies: Status[] = []
let likes: Account[] = []
let boosts: Account[] = []
let reactions: Reaction[] = []
let favCount = 0
let boostCount = 0
let activeFilter: string | null = null
$: hasData = reactions.length > 0 || replies.length > 0 || likes.length > 0 || boosts.length > 0

function parseHost(url: string): { host: string; id: string } {
  const u = new URL(url)
  const id = u.pathname.split('/').filter(Boolean).pop() || ''
  return { host: u.host, id }
}

async function load() {
  loading = true
  error = ''
  const { host, id } = parseHost(url)
  const base = `https://${host}/api/v1/statuses`

  try {
    const [statusRes, contextRes, favouritedRes, rebloggedRes] = await Promise.all([
      fetch(`${base}/${id}`),
      fetch(`${base}/${id}/context`),
      fetch(`${base}/${id}/favourited_by`),
      fetch(`${base}/${id}/reblogged_by`),
    ])

    if (!statusRes.ok) throw new Error(`Failed to load status`)

    const status: Status = await statusRes.json()
    reactions = status.reactions || []
    favCount = status.favourites_count || 0
    boostCount = status.reblogs_count || 0

    if (contextRes.ok) {
      const ctx = await contextRes.json()
      replies = ctx.descendants || []
    }

    if (favouritedRes.ok) {
      likes = await favouritedRes.json()
    }

    if (rebloggedRes.ok) {
      boosts = await rebloggedRes.json()
    }

    loaded = true
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load interactions'
  }

  loading = false
}

function toggleFilter(filter: string) {
  activeFilter = activeFilter === filter ? null : filter
}

function onBackgroundClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.fedia-stat-btn') && !target.closest('.fedia-section')) {
    activeFilter = null
  }
}

function fmtDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<svelte:window on:click={onBackgroundClick} />

<div class="fedia-reactions not-prose">
  {#if !loaded}
    <button
      class="fedia-load-btn"
      on:click={load}
      disabled={loading}
    >
      {#if loading}
        Loading...
      {:else}
        Load interactions
      {/if}
    </button>
  {:else}
    <div class="fedia-stats">
      {#if reactions.length > 0}
        <button
          class="fedia-stat-btn"
          class:active={activeFilter === 'reactions'}
          on:click|stopPropagation={() => toggleFilter('reactions')}
          title="Reactions"
        >
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
          <span class="stat-count">{reactions.reduce((a, r) => a + r.count, 0)}</span>
        </button>
      {/if}
      {#if favCount > 0}
        <button
          class="fedia-stat-btn"
          class:active={activeFilter === 'likes'}
          on:click|stopPropagation={() => toggleFilter('likes')}
          title="Likes"
        >
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span class="stat-count">{favCount}</span>
        </button>
      {/if}
      {#if boostCount > 0}
        <button
          class="fedia-stat-btn"
          class:active={activeFilter === 'boosts'}
          on:click|stopPropagation={() => toggleFilter('boosts')}
          title="Boosts"
        >
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          <span class="stat-count">{boostCount}</span>
        </button>
      {/if}
      {#if replies.length > 0}
        <button
          class="fedia-stat-btn"
          class:active={activeFilter === 'replies'}
          on:click|stopPropagation={() => toggleFilter('replies')}
          title="Replies"
        >
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span class="stat-count">{replies.length}</span>
        </button>
      {/if}
    </div>

    {#if hasData}
      {#if activeFilter !== null}
        <div class="fedia-sections">
          {#if reactions.length > 0 && activeFilter === 'reactions'}
            <details class="fedia-section fedia-section--active" open>
              <summary class="fedia-section-title">Reactions</summary>
              <div class="fedia-reaction-list">
                {#each reactions as rxn}
                  <span class="fedia-reaction-badge">{rxn.name} {rxn.count}</span>
                {/each}
              </div>
            </details>
          {/if}

          {#if replies.length > 0 && activeFilter === 'replies'}
            <details class="fedia-section fedia-section--active" open>
              <summary class="fedia-section-title">Replies ({replies.length})</summary>
              <div class="fedia-reply-list">
                {#each replies as reply}
                  <div class="fedia-reply">
                    <div class="fedia-reply-header">
                      <img class="fedia-avatar" src={reply.account.avatar} alt="" width="28" height="28" loading="lazy" />
                      <a class="fedia-reply-author" href={reply.account.url} target="_blank" rel="noopener noreferrer">
                        {reply.account.display_name || reply.account.username}
                      </a>
                      <span class="fedia-reply-date">{fmtDate(reply.created_at)}</span>
                    </div>
                    <div class="fedia-reply-content">{@html reply.content}</div>
                    {#if reply.media_attachments?.length}
                      <div class="fedia-reply-media">
                        {#each reply.media_attachments as media}
                          {#if media.type === 'image' || media.type === 'gifv'}
                            <img class="fedia-reply-img" src={media.url} alt={media.description || ''} loading="lazy" />
                          {:else if media.type === 'video'}
                            <video class="fedia-reply-img" src={media.url} controls />
                          {/if}
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </details>
          {/if}

          {#if likes.length > 0 && activeFilter === 'likes'}
            <details class="fedia-section fedia-section--active" open>
              <summary class="fedia-section-title">Likes ({likes.length})</summary>
              <div class="fedia-user-list">
                {#each likes as user}
                  <a class="fedia-user" href={user.url} target="_blank" rel="noopener noreferrer">
                    <img class="fedia-avatar" src={user.avatar} alt="" width="28" height="28" loading="lazy" />
                    <span>{user.display_name || user.username}</span>
                  </a>
                {/each}
              </div>
            </details>
          {/if}

          {#if boosts.length > 0 && activeFilter === 'boosts'}
            <details class="fedia-section fedia-section--active" open>
              <summary class="fedia-section-title">Boosts ({boosts.length})</summary>
              <div class="fedia-user-list">
                {#each boosts as user}
                  <a class="fedia-user" href={user.url} target="_blank" rel="noopener noreferrer">
                    <img class="fedia-avatar" src={user.avatar} alt="" width="28" height="28" loading="lazy" />
                    <span>{user.display_name || user.username}</span>
                  </a>
                {/each}
              </div>
            </details>
          {/if}
        </div>
      {/if}
    {:else}
      <p class="fedia-empty">No interactions yet</p>
    {/if}
  {/if}

  {#if error}
    <p class="fedia-error">{error}</p>
  {/if}
</div>

<style lang="stylus">
.fedia-reactions
  margin: 1rem 0
  font-size: 0.9375rem
  line-height: 1.5

.fedia-load-btn
  display: inline-flex
  align-items: center
  gap: 0.375rem
  padding: 0.5rem 1rem
  font-size: 0.875rem
  font-weight: 500
  color: var(--primary)
  background: var(--btn-regular-bg)
  border: 1px solid var(--line-divider)
  border-radius: 0.5rem
  cursor: pointer
  transition: background 0.15s, opacity 0.15s
  &:hover:not(:disabled)
    background: var(--btn-plain-bg-hover)
  &:disabled
    opacity: 0.6
    cursor: not-allowed

.fedia-stats
  display: flex
  flex-wrap: wrap
  gap: 0.5rem
  margin-bottom: 0.75rem

.fedia-stat-btn
  display: inline-flex
  align-items: center
  gap: 0.375rem
  padding: 0.25rem 0.625rem
  font-size: 0.8125rem
  font-weight: 500
  color: var(--text-50)
  background: var(--btn-regular-bg)
  border: 1px solid var(--line-divider)
  border-radius: 9999px
  cursor: pointer
  transition: all 0.15s
  &:hover
    color: var(--primary)
    border-color: var(--primary)
  &.active
    color: var(--primary)
    background: var(--inline-code-bg)
    border-color: var(--primary)

.stat-icon
  width: 1em
  height: 1em

.stat-count
  font-variant-numeric: tabular-nums

.fedia-section
  border: 1px solid var(--line-divider)
  border-radius: 0.5rem
  margin-bottom: 0.5rem
  overflow: hidden
  &--active
    border-color: var(--primary)
    box-shadow: 0 0 0 1px var(--primary)

.fedia-section-title
  padding: 0.5rem 0.75rem
  font-size: 0.8125rem
  font-weight: 600
  cursor: pointer
  user-select: none
  background: var(--card-bg)
  &:hover
    background: var(--btn-plain-bg-hover)

.fedia-reaction-list
  display: flex
  flex-wrap: wrap
  gap: 0.375rem
  padding: 0.5rem 0.75rem

.fedia-reaction-badge
  display: inline-flex
  align-items: center
  gap: 0.25rem
  padding: 0.125rem 0.5rem
  font-size: 0.8125rem
  border: 1px solid var(--line-divider)
  border-radius: 9999px
  background: var(--card-bg)

.fedia-reply-list
  padding: 0.5rem 0.75rem

.fedia-reply
  padding: 0.5rem 0
  border-bottom: 1px solid var(--line-divider)
  &:last-child
    border-bottom: none

.fedia-reply-header
  display: flex
  align-items: center
  gap: 0.5rem
  margin-bottom: 0.25rem

.fedia-avatar
  border-radius: 9999px
  flex-shrink: 0
  object-fit: cover
  background: var(--btn-regular-bg)

.fedia-reply-author
  font-size: 0.8125rem
  font-weight: 600
  color: var(--text-90)
  text-decoration: none
  &:hover
    text-decoration: underline

.fedia-reply-date
  font-size: 0.75rem
  color: var(--text-50)
  margin-left: auto

.fedia-reply-content
  font-size: 0.875rem
  word-wrap: break-word
  overflow-wrap: break-word
  margin-left: 2.25rem
  p
    margin: 0.25rem 0
  a
    color: var(--primary)
    text-decoration: underline
    text-decoration-style: dashed
    text-underline-offset: 0.15rem

.fedia-reply-media
  margin-top: 0.375rem
  margin-left: 2.25rem
  display: flex
  flex-direction: column
  gap: 0.375rem

.fedia-reply-img
  max-width: 100%
  max-height: 20rem
  object-fit: contain
  border-radius: 0.5rem
  background: #000

.fedia-user-list
  display: flex
  flex-direction: column
  padding: 0.5rem 0.75rem

.fedia-user
  display: flex
  align-items: center
  gap: 0.5rem
  padding: 0.25rem 0
  font-size: 0.875rem
  color: var(--text-90)
  text-decoration: none
  &:hover
    color: var(--primary)
    text-decoration: underline

.fedia-empty
  padding: 0.75rem
  font-size: 0.8125rem
  color: var(--text-50)
  text-align: center

.fedia-error
  padding: 0.5rem 0.75rem
  margin-top: 0.5rem
  font-size: 0.8125rem
  color: var(--invalid)
  background: var(--inline-code-bg)
  border-radius: 0.375rem
</style>
