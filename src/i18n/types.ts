import type { pt } from "./pt";

/**
 * O "molde" das traduções, derivado automaticamente do pt.ts.
 *
 * `typeof pt` lê a forma do objeto português (quais grupos existem, quais
 * chaves cada grupo tem) e transforma isso num tipo. Assim não é preciso
 * escrever e manter a lista de chaves à mão: o pt.ts manda, os outros idiomas
 * obedecem.
 */
export type Translations = typeof pt;
