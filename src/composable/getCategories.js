// import axios from "axios";
// import { ref, onMounted, watch } from "vue";

// export default function getCategories(categoryId = null) {
//     const categories = ref([]);
//     const category = ref(null);
//     const error = ref(null);
//     const isLoading = ref(false);

//     const API_URL = "http://localhost:3000/categories";

//     const loadCategories = async () => {
//         try {
//             isLoading.value = true;
//             const res = await axios.get(API_URL);
//             categories.value = res.data;
//         } catch (err) {
//             error.value = err.message;
//         } finally {
//             isLoading.value = false;
//         }
//     };

//     const loadCategoryById = async (id) => {
//         try {
//             isLoading.value = true;
//             const res = await axios.get(`${API_URL}/${id}`);
//             category.value = res.data;
//         } catch (err) {
//             error.value = err.message;
//         } finally {
//             isLoading.value = false;
//         }
//     };

//     onMounted(() => {
//         if (categoryId && categoryId.value) {
//             loadCategoryById(categoryId.value); // Access .value
//         } else {
//             loadCategories();
//         }
//     });

//     if (categoryId) {
//         watch(categoryId, (newId) => loadCategoryById(newId)); // Access .value
//     }

//     return { categories, category, error, isLoading, loadCategories, loadCategoryById };
// }

import { ref, onMounted, watch } from "vue";
import categoryData from "@/Data/DB-server.json";

export default function getCategories(categoryId = null) {
    const categories = ref([]);
    const category = ref(null);
    const error = ref(null);
    const isLoading = ref(false);

    const loadCategories = () => {
        isLoading.value = true;
        try {
            categories.value = categoryData.categories;
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const loadCategoryById = (id) => {
        isLoading.value = true;
        try {
            category.value = categoryData.categories.find(cat => cat.id === id);
            if (!category.value) {
                throw new Error("Category not found");
            }
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        if (categoryId && categoryId.value) {
            loadCategoryById(categoryId.value); // Access .value
        } else {
            loadCategories();
        }
    });

    if (categoryId) {
        watch(categoryId, (newId) => loadCategoryById(newId)); // Access .value
    }

    return { categories, category, error, isLoading, loadCategories, loadCategoryById };
}
