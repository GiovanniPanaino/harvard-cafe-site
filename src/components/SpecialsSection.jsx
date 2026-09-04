import { dailySpecials, weeklySpecials } from '../data/dailySpecials'
import { getJohannesburgDayName, isCocktailHappyHourNow, isWeekday } from '../utils/specialsDate'
import {
  formatRandPrice,
  getDiscountedItems,
  getHalfPriceItems,
  getMissingCategoryIds,
  getSpecialItems,
} from '../utils/menuPricing'

const cocktailCategoryIds = ['cocktails', 'drinks', 'beverages']
const incompleteMenuMessage = 'More matching menu items will appear here as the menu is completed.'

function SpecialsSection() {
  const todayName = getJohannesburgDayName()
  const todaySpecial = dailySpecials[todayName] || dailySpecials.Monday
  const happyHourLive = isCocktailHappyHourNow()
  const weekday = isWeekday(todayName)
  const cocktailItems = getHalfPriceItems(cocktailCategoryIds)

  return (
    <section className="section specials-section reveal-on-scroll reveal-up" id="specials">
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
        <article className="specials-happy-hour-card">
          <div className="specials-card-head">
            <div>
              <span className="specials-kicker">Cocktails</span>
              <h3>Cocktail Happy Hour</h3>
            </div>
            <span className={happyHourLive ? 'special-badge special-badge-live' : 'special-badge'}>
              {happyHourLive ? 'On now' : weekday ? '16:00 to 18:00' : 'Mon to Fri'}
            </span>
          </div>
          <p>Half price cocktails, Monday to Friday, 16:00 to 18:00.</p>
          {cocktailItems.length > 0 ? (
            <SpecialItemsList items={cocktailItems} mode="discount" />
          ) : (
            <p className="specials-empty-note">
              Cocktail menu items are being added. Happy hour runs Monday to Friday, 16:00 to 18:00.
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

function TodaySpecialCard({ special }) {
  const items = getItemsForSpecial(special)
  const hasMissingCategories = getMissingCategoryIds(special.categoryIds).length > 0

  return (
    <article className="specials-today-card">
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
            {item.description ? <p>{item.description}</p> : null}
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
