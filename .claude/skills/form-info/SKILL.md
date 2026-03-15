---
name: form-info
description: Анализ структуры управляемой формы 1С (Form.xml) — элементы, реквизиты, команды, события. Используй для понимания формы — при написании модуля формы, анализе обработчиков и элементов
argument-hint: <FormPath>
allowed-tools:
  - Bash
  - Read
  - Glob
---

# /form-info — Компактная сводка формы

Читает Form.xml и выводит дерево элементов, реквизиты с типами, команды, события. Заменяет чтение тысяч строк XML.

## Команда

```powershell
powershell.exe -NoProfile -File .claude/skills/form-info/scripts/form-info.ps1 -FormPath "<путь к Form.xml>"
```

## Параметры

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| FormPath | да | Путь к файлу Form.xml |
| Expand   | нет | Раскрыть свёрнутую секцию по имени или title, `*` — все |
| Limit    | нет | Макс. строк (по умолчанию 150) |
| Offset   | нет | Пропустить N строк (пагинация) |

## Легенда вывода

**Элементы**: `[Group:V]` `[Group:H]` `[Group:AH]` `[Group:AV]` — UsualGroup с ориентацией; `[Input]` `[Check]` `[Label]` `[LabelField]` `[Table]` `[Button]` `[Pages]` `[Page]` `[CmdBar]` `[Popup]` `[Picture]` `[PicField]` `[BtnGroup]` `[Calendar]`

**Флаги**: `[visible:false]` `[enabled:false]` `[ro]` `,collapse`

**Привязки**: `-> Объект.Поле` (DataPath), `-> Команда [cmd]` (команда формы), `-> Close [std]` (стандартная)

**События**: `{OnChange, StartChoice}`, для расширений `{OnChange[Before]}`

**Заголовок**: `[title:Текст]` — только если отличается от имени

**Реквизиты**: `*` и `(main)` — основной; `DynamicList -> Table` — MainTable; `ValueTable [col: type, ...]` — колонки

**Параметры**: `(key)` — ключевой

**Расширения**: `[EXTENSION]` в заголовке, `[callType]` на событиях/командах, `BaseForm: present (version X)` в конце
