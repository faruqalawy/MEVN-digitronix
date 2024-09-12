import { ref, onMounted, watch } from 'vue'
// import categoryData from '@/Data/DB-server.json'
import axios from 'axios'

export default function getCategories(categoryId = null) {
  const categories = ref([])
  const category = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const loadCategories = async () => {
    isLoading.value = true
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/categories`)
      categories.value = res.data.map((category) => ({
        ...category,
        id: category._id
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const loadCategoryById = async (id) => {
    isLoading.value = true
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/categories/${id}`);
      const categoryData = res.data   
      if (!categoryData) {
        throw new Error('Category not found')
      }

      // Map category and product IDs to actual product objects for easier consumption in templates or components
      category.value = {
        ...categoryData,
        id: categoryData._id,
        products: categoryData.products.map((product) => ({
          ...product,
          id: product._id
        }))
      }
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    if (categoryId && categoryId.value) {
      loadCategoryById(categoryId.value) // Access .value
    } else {
      loadCategories()
    }
  })

  if (categoryId) {
    watch(categoryId, (newId) => loadCategoryById(newId)) // Access .value
  }

  return { categories, category, error, isLoading, loadCategories, loadCategoryById }
}
