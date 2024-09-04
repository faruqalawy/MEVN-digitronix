import { computed } from "vue";

export function totalPrice(cart) {
    return computed(() => {
        return cart.value.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    })
}

export default totalPrice