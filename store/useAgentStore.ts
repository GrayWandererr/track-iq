import { create } from 'zustand'
import { Agent, mockAgents } from '@/mock/agents'
import { Connector, mockConnectors } from '@/mock/connectors'
import { mockGet, mockPatch, mockPost } from '@/lib/mockRouter'

interface AgentStore {
  // State
  agents: Agent[]
  connectors: Connector[]
  loading: boolean
  error: string | null

  // Actions
  loadAgents: () => Promise<void>
  loadConnectors: () => Promise<void>
  updateAgent: (id: string, partial: Partial<Agent>) => Promise<void>
  updateConnector: (id: string, partial: Partial<Connector>) => Promise<void>
  toggleAgentStatus: (id: string) => Promise<void>
  fixConnector: (id: string) => Promise<void>
  sendChatMessage: (message: string) => Promise<any>
  
  // Utilities
  getAgent: (id: string) => Agent | undefined
  getConnector: (id: string) => Connector | undefined
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  // Initial state
  agents: mockAgents,
  connectors: mockConnectors,
  loading: false,
  error: null,

  // Load agents from mock API
  loadAgents: async () => {
    try {
      set({ loading: true, error: null })
      const response = await mockGet('/agents')
      set({ agents: response.data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  // Load connectors from mock API
  loadConnectors: async () => {
    try {
      set({ loading: true, error: null })
      const response = await mockGet('/connectors')
      set({ connectors: response.data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  // Update an agent
  updateAgent: async (id: string, partial: Partial<Agent>) => {
    try {
      set({ loading: true, error: null })
      const response = await mockPatch(`/agents/${id}`, partial)
      
      set(state => ({
        agents: state.agents.map(agent => 
          agent.id === id ? { ...agent, ...partial } : agent
        ),
        loading: false
      }))
      
      return response
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  // Update a connector
  updateConnector: async (id: string, partial: Partial<Connector>) => {
    try {
      set({ loading: true, error: null })
      const response = await mockPatch(`/connectors/${id}`, partial)
      
      set(state => ({
        connectors: state.connectors.map(connector => 
          connector.id === id ? { ...connector, ...partial } : connector
        ),
        loading: false
      }))
      
      return response
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
      throw error
    }
  },

  // Toggle agent status between running and stopped
  toggleAgentStatus: async (id: string) => {
    const agent = get().getAgent(id)
    if (!agent) return

    const newStatus = agent.status === 'running' ? 'stopped' : 'running'
    const action = newStatus === 'running' ? 'resume' : 'pause'
    
    try {
      await mockPost(`/agents/${id}/action`, { action })
      await get().updateAgent(id, { status: newStatus })
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  // Fix a connector (set status to healthy)
  fixConnector: async (id: string) => {
    try {
      await get().updateConnector(id, { 
        status: 'healthy',
        lastSync: 'Just now'
      })
    } catch (error) {
      throw error
    }
  },

  // Send chat message and get response
  sendChatMessage: async (message: string) => {
    try {
      const response = await mockPost('/chat', { message })
      return response.data
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  // Get agent by ID
  getAgent: (id: string) => {
    return get().agents.find(agent => agent.id === id)
  },

  // Get connector by ID
  getConnector: (id: string) => {
    return get().connectors.find(connector => connector.id === id)
  },

  // Set error state
  setError: (error: string | null) => {
    set({ error })
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ loading })
  }
}))

// Initialize store with mock data
export const initializeStore = () => {
  const store = useAgentStore.getState()
  store.loadAgents()
  store.loadConnectors()
} 