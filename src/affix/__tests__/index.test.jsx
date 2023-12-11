import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { beforeEach, expect, it, vi } from 'vitest';
import { Affix } from '@/src/affix/index.ts';

describe('Affix', () => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());

  describe('Test Affix Props', () => {
    const containerRef = ref();
    const offsetTop = ref(100);
    const offsetBottom = ref(100);
    const wrapper = mount({
      render() {
        return (
          <div style="width: 500px; height: 500px" ref={containerRef}>
            <div style="width: 1000px; height: 1000px; padding-top: 700px;">
              <Affix container={containerRef.value} offsetBottom={offsetBottom.value} offsetTop={offsetTop.value}>
                <div class="affixs" style="width: 100px; height: 20px">
                  hello world
                </div>
              </Affix>
            </div>
          </div>
        );
      },
    });

    const affixWrapper = wrapper.findComponent(Affix);

    it('Test get container', async () => {
      await nextTick();
      expect(affixWrapper.props('container')).toBe(containerRef.value);
    });

    it('Test default slot', async () => {
      await nextTick();
      expect(affixWrapper.html().includes('<div style="width: 100px; height: 20px;">hello world</div>')).toBe(true);
    });

    it('Test offsetBottom', async () => {
      await nextTick();
      containerRef.value.scrollTop = 500;
      const affixElement = wrapper.find('.affixs');
      expect(wrapper.find('.affixs').exists()).toBeTruthy();
      // console.log("affixElement", affixElement);
      // const rect = affixElement.getBoundingClientRect();

      // // 判断元素是否在可视页面的特定位置
      // const isInView = rect.bottom <= window.innerHeight;

      // expect(isInView).toBe(true);
    });
  });
});
