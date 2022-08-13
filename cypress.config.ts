import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('before:run', (details) => {
                details.specs?.forEach((spec) => {
                    const { name } = spec
                    const fileName = name.split('.cy')[0]
                    const parts = fileName.split('/')
                    const parentDir = parts.slice(0, -1).join('/')
                    const specName = parts[parts.length - 1]
                    const tasksFile = `${parentDir}/${specName}.tasks.json`
                    
                })
            })
        }
    }
})
