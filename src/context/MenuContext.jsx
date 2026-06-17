import { createContext, useContext, useMemo, useState } from 'react'
import {
  addMenuItem as addStoredMenuItem,
  deleteMenuItem as deleteStoredMenuItem,
  getMenuData,
  resetMenuToDefault as resetStoredMenuToDefault,
  saveMenuData,
  updateMenuItem as updateStoredMenuItem,
} from '../data/menuStore'

const MenuContext = createContext(null)

export function MenuProvider({ children }) {
  const [menuData, setMenuData] = useState(() => getMenuData())

  function persist(nextMenuData) {
    const saved = saveMenuData(nextMenuData)
    setMenuData(saved)
    return saved
  }

  function addMenuItem(itemData) {
    const saved = addStoredMenuItem(itemData)
    setMenuData(saved)
    return saved
  }

  function updateMenuItem(itemId, updates) {
    const saved = updateStoredMenuItem(itemId, updates)
    setMenuData(saved)
    return saved
  }

  function deleteMenuItem(itemId) {
    const saved = deleteStoredMenuItem(itemId)
    setMenuData(saved)
    return saved
  }

  function resetMenuToDefault() {
    const defaults = resetStoredMenuToDefault()
    setMenuData(defaults)
    return defaults
  }

  const value = useMemo(
    () => ({
      menuCategories: menuData.categories,
      menuItems: menuData.items,
      saveMenuData: persist,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      resetMenuToDefault,
    }),
    [menuData],
  )

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu must be used inside MenuProvider')
  return context
}
