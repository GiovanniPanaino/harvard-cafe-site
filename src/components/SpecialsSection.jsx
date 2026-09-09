import { useEffect, useState } from 'react'
import { cocktailHappyHour, dailySpecials, weeklySpecials } from '../data/dailySpecials'
import { getJohannesburgDayName, isCocktailHappyHourNow } from '../utils/specialsDate'
import {
  formatRandPrice,
  getDiscountedItems,
  getMissingCategoryIds,
  getSpecialItems,
} from '../utils/menuPricing'

const incompleteMenuMessage = 'More matching menu items will appear here as the menu is completed.'

function SpecialsSection() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer
    const refresh = () => {
      const current = new Date()
      setNow(current)
      clearTimeout(timer)
      timer = setTimeout(refresh, 60000 - current.getTime() % 60000)
    }
    refresh()
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  const todayName = getJohannesburgDayName(now)
  const todaySpecial = dailySpecials[todayName] || dailySpecials.Monday
  const happyHourLive = isCocktailHappyHourNow(now)
  const happyHourDay = cocktailHappyHour.days.includes(todayName)
  const cocktailItems = getDiscountedItems(cocktailHappyHour.categoryIds, cocktailHappyHour.discountPercent, {
    requiredSpecialTag: cocktailHappyHour.requiredSpecialTag,
  })

  return (
    <section className="section specials-section" id="specials" data-reveal="fade-up">
      <div className="section-heading specials-heading">
        <p className="eyebrow">Today&apos;s Flight Plan</p>
        <h2>Daily Specials</h2>
        <p>
          From half-price pizzas to weekend buffets, Harvard Cafe keeps the week moving with specials worth planning
          around.
        </p>
      </div>

      <div className="specials-layout">
        <TodaySpecialCard special={todaySpecial} />
        <article className="specials-happy-hour-card" data-reveal="bank-right">
          <div className="specials-card-head">
            <div>
              <span className="specials-kicker">Cocktails</span>
              <h3>{cocktailHappyHour.title}</h3>
            </div>
            <span className={happyHourLive ? 'special-badge special-badge-live' : 'special-badge'}>
              {getCocktailHappyHourStatus({ happyHourLive, happyHourDay })}
            </span>
          </div>
          <p>{cocktailHappyHour.description}</p>
          {!happyHourLive ? (
            <p className="specials-empty-note">
              {happyHourDay
                ? `Available today from ${cocktailHappyHour.startTime} to ${cocktailHappyHour.endTime}.`
                : `Available ${formatHappyHourWindow()}.`}
            </p>
          ) : cocktailItems.length > 0 ? (
            <SpecialItemsList items={cocktailItems} mode="discount" />
          ) : (
            <p className="specials-empty-note">
              Cocktail menu items are being added. Happy hour runs {formatHappyHourWindow()}.
            </p>
          )}
        </article>
      </div>

      <div className="specials-week-wrap" aria-label="Weekly specials">
        <div className="specials-week-grid">
          {weeklySpecials.map((special) => (
            <article
              className={special.label === todayName ? 'specials-day-card active' : 'specials-day-card'}
              key={special.label}
              data-reveal-child
            >
              <span>{special.label}</span>
              <strong>{special.title}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function getCocktailHappyHourStatus({ happyHourLive, happyHourDay }) {
  if (happyHourLive) return 'On now'

  if (happyHourDay) return `${cocktailHappyHour.startTime} to ${cocktailHappyHour.endTime}`

  return `Available ${formatHappyHourWindow()}`
}

function formatHappyHourWindow() {
  return `Monday to Friday, ${cocktailHappyHour.startTime} to ${cocktailHappyHour.endTime}`
}

function TodaySpecialCard({ special }) {
  const items = getItemsForSpecial(special)
  const hasMissingCategories = getMissingCategoryIds(special.categoryIds).length > 0

  return (
    <article className="specials-today-card" data-reveal="bank-left">
      <div className="specials-card-head">
        <div>
          <span className="specials-kicker">Today&apos;s Special</span>
          <h3>{special.title}</h3>
        </div>
        <span className="special-badge">{special.label}</span>
      </div>
      <p>{special.description}</p>
      {special.type === 'discount' ? <p className="specials-helper">Prices below are calculated from the current menu.</p> : null}
      {items.length > 0 ? (
        <>
          <SpecialItemsList items={items} mode={special.type} />
          {hasMissingCategories ? (
            <p className="specials-empty-note">
              {incompleteMenuMessage}
            </p>
          ) : null}
        </>
      ) : (
        <p className="specials-empty-note">
          Menu items for this special are being added. Please view the full menu or contact Harvard Cafe.
          <span>{incompleteMenuMessage}</span>
        </p>
      )}
    </article>
  )
}

function getItemsForSpecial(special) {
  if (special.type === 'discount') {
    return getDiscountedItems(special.categoryIds, special.discountPercent, {
      requiredSpecialTag: special.requiredSpecialTag,
    })
  }

  return getSpecialItems(special)
}

function SpecialItemsList({ items, mode }) {
  return (
    <div className="specials-item-list">
      {items.map((item) => (
        <article className="specials-item" key={`${item.categoryId}-${item.sectionHeading}-${item.name}`}>
          <div>
            <h4>{item.name}</h4>
          </div>
          <SpecialItemPrice item={item} mode={mode} />
        </article>
      ))}
    </div>
  )
}

function SpecialItemPrice({ item, mode }) {
  if (mode === 'discount') {
    if (item.discountedOptions?.length) {
      return (
        <div className="specials-price-options">
          {item.discountedOptions.map((option) => (
            <div className="specials-price-row" key={`${item.name}-${option.label || option.original}`}>
              {option.label ? <span className="special-price-size">{option.label}</span> : null}
              <span className="special-price-original">Was {option.original}</span>
              <strong className="special-price-now">Today {option.discounted}</strong>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="specials-price-row">
        <span className="special-price-original">Was {item.price}</span>
        <strong className="special-price-now">
          {item.discountedPrice === null ? 'Today SQ' : `Today ${formatRandPrice(item.discountedPrice)}`}
        </strong>
      </div>
    )
  }

  if (mode === 'free') {
    return (
      <div className="specials-price-row">
        <span className="special-price-original">Was {item.price}</span>
        <strong className="special-price-now">Friday FREE</strong>
      </div>
    )
  }

  return <strong className="special-price-now">{item.price}</strong>
}

export default SpecialsSection
