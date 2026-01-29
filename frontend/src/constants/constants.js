export const PRODUCT_CATEGORIES = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes'
]

export const DEFAULT_AVATAR_URL = '/images/default-avatar.svg'

// Normalize avatar URLs so legacy defaults use the new aesthetic asset
export const getAvatarUrl = (url) => {
    if (!url) return DEFAULT_AVATAR_URL;
    if (/default_avatar|default-avatar/i.test(url)) return DEFAULT_AVATAR_URL;
    return url;
}