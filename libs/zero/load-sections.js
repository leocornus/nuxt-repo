// Utilities
import {
  camelCase,
  upperFirst,
} from 'lodash'

/**
 * the mixins function.
 */
export default function (sections = []) {
    return {
        name: 'LoadSections',

        // Iterates the provide list of components
        // and returns a function that returns a
        // Promise.
        components: sections.reduce((acc, cur) => {
            const name = upperFirst(camelCase(cur))

            acc[`ZeroSection${name}`] = () => import(`@/components/zero/sections/${name}.vue`)

            return acc
        }, {}),

        data: () => ({ sections }),
    }
}
