import { ValuePipe } from './value.pipe';

describe('ValuePipe', () => {
  let valuePipe :any
  beforeEach(()=>{
    valuePipe = new ValuePipe()
  })

  it('should display weak',()=>{
    expect(valuePipe.transform(8)).toBe('8 weak')
  })

  it('should display stronger',()=>{
    expect(valuePipe.transform(15)).toEqual('15 stronger')
  })
  it('should display weak',()=>{
    expect(valuePipe.transform(23)).toBe('23 strongest')
  })

});
