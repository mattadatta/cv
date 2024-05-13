import { Address } from "../schema/cv";

export function formatAddress(address: Address): string {
  return `${address.city}, ${address.province}, ${address.country}`
}
