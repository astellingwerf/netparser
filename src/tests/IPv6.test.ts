import * as index from "../index";
import * as shared from "../shared";
import * as ipv6 from "../ipv6";

test("sanity check IPv6 offset by /128", () => {
  const input = "2001:db8:122:344::";
  const bytes = ipv6.addrToBytes(input, true);
  shared.increaseAddressWithCIDR(bytes, 128, true);
  const output = ipv6.bytesToAddr(bytes, true);
  const expected = "2001:db8:122:344::1";
  if (output !== expected) {
    throw new Error(`'${output}' !== '${expected}'`);
  }
});

test("sanity check IPv6 negative offset by /128", () => {
  const input = "2001:db8:122:344::";
  const bytes = ipv6.addrToBytes(input, true);
  shared.decreaseAddressWithCIDR(bytes, 128, true);
  const output = ipv6.bytesToAddr(bytes, true);
  const expected = "2001:db8:122:343:ffff:ffff:ffff:ffff";
  if (output !== expected) {
    throw new Error(`'${output}' !== '${expected}'`);
  }
});

test("sanity check IPv6 applySubnetMask()", () => {
  const input = "b011:a2c2:7328:cc01:4ee7:e2ec:6269:babf";
  const bytes = ipv6.addrToBytes(input, true);
  shared.applySubnetMask(bytes, 64);
  const output = ipv6.bytesToAddr(bytes, true);
  const expected = "b011:a2c2:7328:cc01::";
  if (output !== expected) {
    throw new Error(`'${output}' !== '${expected}'`);
  }
});

test("sanity check convertedEmbeddedIPv4", () => {
  const output = ipv6.convertEmbeddedIPv4("2001:db8:122:344::192.0.2.33");
  expect(output).toEqual("2001:db8:122:344::c00:221");
});

test("sanity check ipv6.bytesToAddr", () => {
  const output = ipv6.bytesToAddr(new Uint8Array(3));
  expect(output).toEqual(null);
});

test("sanity check ipv6.randomAddress", () => {
  const output = ipv6.randomAddress();
  expect(index.ip(output)).toBeTruthy();
});

test("sanity check ipv6.randomNetwork", () => {
  const output = ipv6.randomNetwork();
  expect(index.network(output)).toBeTruthy();
});
