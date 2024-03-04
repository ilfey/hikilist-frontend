import { reactive } from "vue"

export const ordering = reactive([
    {
        name: "По названию",
        state: null,
        key: "title",
    },
    {
        name: "По количеству серий",
        state: null,
        key: "episodes_released",
    },
    {
        name: "По дате выхода",
        state: null,
        key: "released",
    },
    {
        name: "По типу",
        state: null,
        key: "format",
    },
])